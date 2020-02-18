using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.ScientificReportTypes;
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
    public interface IScientificReportTypeService
    {
        Task<PagedList<ScientificReportTypeViewModel>> ListScientificReportTypeAsync(RequestListViewModel requestListViewModel);
        Task<ScientificReportType> GetScientificReportTypeByIdAsync(Guid? id);
        Task<ResponseModel> CreateScientificReportTypeAsync(ScientificReportTypeManageModel scientificReportTypeManagerModel);
        Task<ResponseModel> UpdateScientificReportTypeAsync(Guid id, ScientificReportTypeManageModel scientificReportTypeManagerModel);
        Task<ResponseModel> DeleteScientificReportTypeAsync(Guid id);
    }
    public class ScientificReportTypeService : IScientificReportTypeService
    {
        private readonly IRepository<ScientificReportType> _scientificReportTypeRepository;
        private readonly IMapper _mapper;

        public ScientificReportTypeService(IRepository<ScientificReportType> repository, IMapper mapper)
        {
            _scientificReportTypeRepository = repository;
            _mapper = mapper;
        }

        #region private method

        private IQueryable<ScientificReportType> GetAll()
        {
            return _scientificReportTypeRepository.GetAll().Where(i => !i.RecordDeleted);
        }

        private List<string> GetAllPropertyNameOfScientificReportTypeViewModel()
        {
            var scientificReportTypeViewModel = new ScientificReportTypeViewModel();

            var type = scientificReportTypeViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion

        public async Task<PagedList<ScientificReportTypeViewModel>> ListScientificReportTypeAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new ScientificReportTypeViewModel(x)).ToListAsync();

            var scientificReportTypeViewModelProperties = GetAllPropertyNameOfScientificReportTypeViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = string.Empty;

            foreach (var scientificReportTypeViewModelProperty in scientificReportTypeViewModelProperties)
            {
                var lowerTypeViewModelProperty = scientificReportTypeViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = scientificReportTypeViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(ScientificReportTypeViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ScientificReportTypeViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ScientificReportType> GetScientificReportTypeByIdAsync(Guid? id)
        {
            return await _scientificReportTypeRepository.GetByIdAsync(id);
        }

        public async Task<ResponseModel> CreateScientificReportTypeAsync(ScientificReportTypeManageModel scientificReportTypeManageModel)
        {
            var scientificReportType = await _scientificReportTypeRepository.FetchFirstAsync(x => x.Name == scientificReportTypeManageModel.Name);
            if (scientificReportType != null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This scientificReportType is exist"
                };
            }
            else
            {
                scientificReportType = new ScientificReportType();
                scientificReportTypeManageModel.GetScientificReportTypeFromModel(scientificReportType);
                await _scientificReportTypeRepository.InsertAsync(scientificReportType);
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ScientificReportTypeViewModel(scientificReportType),
                };
            }
        }

        public async Task<ResponseModel> UpdateScientificReportTypeAsync(Guid id, ScientificReportTypeManageModel scientificReportTypeManageModel)
        {
            var scientificReportType = await _scientificReportTypeRepository.GetByIdAsync(id);
            if (scientificReportType == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This scientific report type is not exist"
                };
            }
            else
            {
                var existedScientificReportTypeName = await _scientificReportTypeRepository.FetchFirstAsync(x => x.Name == scientificReportTypeManageModel.Name && x.Id != id);
                if (existedScientificReportTypeName != null)
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Scientific Report Type " + scientificReportType.Name + " is exist on system. Please try again!",
                    };
                }
                else
                {
                    scientificReportTypeManageModel.GetScientificReportTypeFromModel(scientificReportType);
                    return await _scientificReportTypeRepository.UpdateAsync(scientificReportType);
                }
            }
        }

        public async Task<ResponseModel> DeleteScientificReportTypeAsync(Guid id)
        {
            return await _scientificReportTypeRepository.DeleteAsync(id);
        }
    }
}
