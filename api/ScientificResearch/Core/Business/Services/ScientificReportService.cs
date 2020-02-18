using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.ScientificReports;
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
    public interface IScientificReportService
    {
        Task<PagedList<ScientificReportViewModel>> ListScientificReportAsync(RequestListViewModel requestListViewModel);

        Task<ScientificReportViewModel> GetScientificReportByIdAsync(Guid? id);

        Task<ResponseModel> CreateScientificReportAsync(ScientificReportManageModel scientificReportManagerModel);

        Task<ResponseModel> UpdateScientificReportAsync(Guid id, ScientificReportManageModel scientificReportManagerModel);

        Task<ResponseModel> DeleteScientificReportAsync(Guid id);
    }
    public class ScientificReportService : IScientificReportService
    {
        private readonly IRepository<ScientificReport> _scientificReportResponstory;
        private readonly IMapper _mapper;

        public ScientificReportService(IRepository<ScientificReport> scientificReportResponstory, IMapper mapper)
        {
            _scientificReportResponstory = scientificReportResponstory;
            _mapper = mapper;
        }

        #region private method
        private IQueryable<ScientificReport> GetAll()
        {
            return _scientificReportResponstory.GetAll().Include(x => x.ScientificReportType)
                .Include(x => x.Lecturer)
                .Include(x => x.User);
        }

        private List<string> GetAllPropertyNameOfScientificReportViewModel()
        {
            var scientificReportViewModel = new ScientificReportViewModel();

            var type = scientificReportViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion
        public async Task<PagedList<ScientificReportViewModel>> ListScientificReportAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
            .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
            && (string.IsNullOrEmpty(requestListViewModel.Query)
                || (x.Name.Contains(requestListViewModel.Query)
                || (x.Content.Equals(requestListViewModel.Query))
                )))
            .Select(x => new ScientificReportViewModel(x)).ToListAsync();

            var scientificReportViewModelProperties = GetAllPropertyNameOfScientificReportViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = string.Empty;

            foreach (var scientificReportViewModelProperty in scientificReportViewModelProperties)
            {
                var lowerTypeViewModelProperty = scientificReportViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = scientificReportViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(ScientificReportViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ScientificReportViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }
        public async Task<ScientificReportViewModel> GetScientificReportByIdAsync(Guid? id)
        {
            var scientificReport = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new ScientificReportViewModel(scientificReport);
        }


        public async Task<ResponseModel> CreateScientificReportAsync(ScientificReportManageModel scientificReportManageModel)
        {
            var scientificReport = await _scientificReportResponstory.FetchFirstAsync(x => x.Name == scientificReportManageModel.Name && x.ScientificReportTypeId == scientificReportManageModel.ScientificReportTypeId);
            if (scientificReport != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Scientific Report is exist. Can you try again with the update!"
                };
            }
            else
            {
                scientificReport = _mapper.Map<ScientificReport>(scientificReportManageModel);

                await _scientificReportResponstory.InsertAsync(scientificReport);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ScientificReportViewModel(scientificReport)
                };
            }
        }
        public async Task<ResponseModel> UpdateScientificReportAsync(Guid id, ScientificReportManageModel scientificReportManageModel)
        {
            var scientificReport = await _scientificReportResponstory.GetByIdAsync(id);
            if (scientificReport == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This ScientificReport is not exist. Please try again!"
                };
            }
            else
            {
                var existedScientificReport = await _scientificReportResponstory.FetchFirstAsync(x => x.Name == scientificReportManageModel.Name && x.ScientificReportTypeId == scientificReportManageModel.ScientificReportTypeId && x.Id != id);
                if (existedScientificReport != null)
                {
                    var scientificReportType = await _scientificReportResponstory.GetByIdAsync(scientificReportManageModel.ScientificReportTypeId);
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "ScientificReport " + existedScientificReport.Name + " already created on Scientific Report Type " + scientificReportType.Name,
                    };
                }
                else
                {
                    scientificReportManageModel.GetScientificReportFromModel(scientificReport);
                    return await _scientificReportResponstory.UpdateAsync(scientificReport);
                }
            }

        }
        public async Task<ResponseModel> DeleteScientificReportAsync(Guid id)
        {
            return await _scientificReportResponstory.DeleteAsync(id);
        }

    }
}
