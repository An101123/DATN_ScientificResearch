using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.Lecturers;
using ScientificResearch.Core.Business.Models.ScientificReports;
using ScientificResearch.Core.Business.Models.ScientificWorks;
using ScientificResearch.Core.Business.Reflections;
using ScientificResearch.Core.Common.Constants;
using ScientificResearch.Core.DataAccess.Repository.Base;
using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Services
{
    public interface ILecturerService
    {
        Task<PagedList<LecturerViewModel>> ListLecturerAsync(RequestListViewModel requestListViewModel);
        Task<LecturerViewModel> GetLecturerByIdAsync(Guid? id);
        Task<ResponseModel> CreateLecturerAsync(LecturerManageModel lecturerManageModel);
        Task<ResponseModel> UpdateLecturerAsync(Guid id, LecturerManageModel lecturerManageModel);
        Task<ResponseModel> DeleteLecturerAsync(Guid id);
        Task<ResponseModel> GetScientificWorkByLecturerIdAsync(Guid? id);
        Task<ResponseModel> GetScientificReportByLecturerIdAsync(Guid? id);
    }

    public class LecturerService : ILecturerService
    {
        private readonly IRepository<Lecturer> _lecturerRepository;
        private readonly IMapper _mapper;

        #region constructor

        public LecturerService(IRepository<Lecturer> lecturerRepository, IMapper mapper)
        {
            _lecturerRepository = lecturerRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method

        private IQueryable<Lecturer> GetAll()
        {
            return _lecturerRepository.GetAll().Include(x => x.ScientificReports).Include(x => x.ScientificWorks);
        }

        private List<string> GetAllPropertyNameOfLecturerViewModel()
        {
            var lecturerViewModel = new LecturerViewModel();

            var type = lecturerViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion

        public async Task<PagedList<LecturerViewModel>> ListLecturerAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.ToString().Contains(requestListViewModel.Query)
                    )))
                .Select(x => new LecturerViewModel(x)).ToListAsync();

            var lecturerViewModelProperties = GetAllPropertyNameOfLecturerViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = lecturerViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            //foreach (var tableViewModelProperty in tableViewModelProperties)
            //{
            //    var lowerTypeViewModelProperty = tableViewModelProperty.ToLower();
            //    if (lowerTypeViewModelProperty.Equals(requestPropertyName))
            //    {
            //        matchedPropertyName = tableViewModelProperty;
            //        break;
            //    }
            //}

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(LecturerViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<LecturerViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<LecturerViewModel> GetLecturerByIdAsync(Guid? id)
        {
            var table = await GetAll().FirstAsync(x => x.Id == id);
            return new LecturerViewModel(table);
        }

        //public async Task<ResponseModel> CreateLecturerAsync(LecturerManageModel lecturerManageModel)
        //{
        //    var lecturer = _mapper.Map<Lecturer>(lecturerManageModel);
        //    await _lecturerRepository.InsertAsync(lecturer);
        //    return new ResponseModel
        //    {
        //        StatusCode = System.Net.HttpStatusCode.OK,
        //        Data = new LecturerViewModel(lecturer)
        //    };
        //}
        public async Task<ResponseModel> CreateLecturerAsync(LecturerManageModel lecturerManageModel)
        {
            var lecturer = await _lecturerRepository.FetchFirstAsync(x => x.Name == lecturerManageModel.Name);
            if (lecturer != null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Lecturer is exist"
                };
            }
            else
            {
                lecturer = new Lecturer();
                lecturerManageModel.GetLecturerFromModel(lecturer);
                await _lecturerRepository.InsertAsync(lecturer);
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new LecturerViewModel(lecturer),
                };
            }
        }

        public async Task<ResponseModel> UpdateLecturerAsync(Guid id, LecturerManageModel lecturerManageModel)
        {
            var lecturer = await _lecturerRepository.GetByIdAsync(id);
            if (lecturer == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This lecturer is not exist"
                };
            }
            else
            {
                lecturerManageModel.GetLecturerFromModel(lecturer);
                return await _lecturerRepository.UpdateAsync(lecturer);
            }
        }

        public async Task<ResponseModel> DeleteLecturerAsync(Guid id)
        {
            return await _lecturerRepository.DeleteAsync(id);
        }

        public async Task<ResponseModel> GetScientificWorkByLecturerIdAsync(Guid? id)
        {
            var lecturer = await GetAll().FirstAsync(x => x.Id == id);
            if (lecturer.ScientificWorks == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This lecturer has no scientific work"
                };
            }
            else
            {
                List<ScientificWorkViewModel> scientificWorks = lecturer.ScientificWorks.Select(x => new ScientificWorkViewModel(x)).ToList();
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = scientificWorks
                };
            }
        }

        public async Task<ResponseModel> GetScientificReportByLecturerIdAsync(Guid? id)
        {
            var lecturer = await GetAll().FirstAsync(x => x.Id == id);
            if (lecturer.ScientificReports == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This lecturer has no scientific report"
                };
            }
            else
            {
                List<ScientificReportViewModel> scientificReports = lecturer.ScientificReports.Select(x => new ScientificReportViewModel(x)).ToList();
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = scientificReports
                };
            }
        }
    }
}
