using AutoMapper;
using ScientificResearch.Core.Business.Models.Lecturers;
using ScientificResearch.Core.Business.Models.Levels;
using ScientificResearch.Core.Business.Models.ScientificReports;
using ScientificResearch.Core.Business.Models.ScientificReportTypes;
using ScientificResearch.Core.Business.Models.ScientificWorks;
using ScientificResearch.Core.Business.Models.Users;
using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models
{
    public class Automapping : Profile
    {
        public Automapping()
        {
            CreateMap<LevelManageModel, Level>();
            CreateMap<ScientificWorkManageModel, ScientificWork>();
            CreateMap<ScientificReportManageModel, ScientificReport>();
            CreateMap<LecturerManageModel, Lecturer>();
            CreateMap<ScientificReportTypeManageModel, ScientificReportType>();
            CreateMap<UserManageModel, User>();
        }
    }
}
