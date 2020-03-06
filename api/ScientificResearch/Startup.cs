using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Common.Extentions;
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
using ScientificResearch.Core.Common.Utilities;
using ScientificResearch.Core.DataAccess;
using ScientificResearch.Core.DataAccess.Repository.Base;
using ScientificResearch.Entities;
using ScientificResearch.Entities.Enums;
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
            services.AddControllers().AddNewtonsoftJson();

            // Add service and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    );
            });

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
            app.UseCors("CorsPolicy");

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
            InitUserAdmin();
        }
        private void RunMigration(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<ScientificResearchDbContext>().Database.Migrate();
            }
        }
        private void InitUserAdmin()
        {
            var userRepository = IoCHelper.GetInstance<IRepository<User>>();
            var user = new User();
            user.Username = "antran";
            user.FullName = "Super Admin";
            user.Email = "an.tran@orientsoftware.com";
            user.Password = "orient@123";

            /*var password = "orient@123";
            password.GeneratePassword(out string saltKey, out string hashPass);

            user.Password = hashPass;*/
            user.Gender = UserEnums.UserGender.Nam;

            var users = new[]
            {
                user
            };

            userRepository.GetDbContext().Users.AddIfNotExist(x => x.Email, users
                );
            userRepository.GetDbContext().SaveChanges();
        }
    }
}
