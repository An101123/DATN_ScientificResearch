using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.IoC;
using ScientificResearch.Core.Business.Models.Levels;
using ScientificResearch.Core.Business.Services;
using ScientificResearch.Core.DataAccess;
using ScientificResearch.Core.DataAccess.Repository.Base;
using ScientificResearch.Entities;
using ScientificResearch.Options;

namespace ScientificResearch
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<ScientificResearchDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ScientificResearch")));
            services.AddControllers();

            services.AddAutoMapper(typeof(Startup));

            //Register Services
            services.AddScoped<ILevelService, LevelService>();
            services.AddScoped<IScientificWorkService, ScientificWorkService>();
            services.AddScoped<ILecturerService, LecturerService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<INewsService, NewsService>();
            services.AddScoped<IScientificReportService, ScientificReportService>();
            services.AddScoped<IScientificReportTypeService, ScientificReportTypeService>();

            //Register Repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            IoCHelper.SetServiceProvider(services.BuildServiceProvider());

            services.AddMvc(option =>
            {
                option.Filters.Add<HandleExceptionFilterAttribute>();
            });

            //Swagger
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo { Title = "ScientificResearch API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();


            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Auto run migration
            RunMigration(app);
        }
        private void RunMigration(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<ScientificResearchDbContext>().Database.Migrate();
            }
        }
    }
}
