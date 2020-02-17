using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ScientificResearch.Core.Business.Models.Base;
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
    public interface IScientificWorkService
    {
        Task<PagedList<ScientificWorkViewModel>> ListScientificWorkAsync(RequestListViewModel requestListViewModel);

        Task<ScientificWorkViewModel> GetScientificWorkByIdAsync(Guid? id);

        Task<ResponseModel> CreateScientificWorkAsync(ScientificWorkManageModel scientificWorkManagerModel);

        Task<ResponseModel> UpdateScientificWorkAsync(Guid id, ScientificWorkManageModel scientificWorkManagerModel);

        Task<ResponseModel> DeleteScientificWorkAsync(Guid id);
    }
    public class ScientificWorkService : IScientificWorkService
    {
        private readonly IRepository<ScientificWork> _scientificWorkResponstory;
        private readonly IMapper _mapper;

        public ScientificWorkService(IRepository<ScientificWork> scientificWorkResponstory, IMapper mapper)
        {
            _scientificWorkResponstory = scientificWorkResponstory;
            _mapper = mapper;
        }

        #region private method
        private IQueryable<ScientificWork> GetAll()
        {
            return _scientificWorkResponstory.GetAll().Include(x => x.Level)
                .Include(x => x.Lecturer)
                .Include(x => x.User);
        }

        private List<string> GetAllPropertyNameOfScientificWorkViewModel()
        {
            var scientificWorkViewModel = new ScientificWorkViewModel();

            var type = scientificWorkViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion
        public async Task<PagedList<ScientificWorkViewModel>> ListScientificWorkAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
            .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
            && (string.IsNullOrEmpty(requestListViewModel.Query)
                || (x.Name.Contains(requestListViewModel.Query)
                || (x.Content.Equals(requestListViewModel.Query))
                )))
            .Select(x => new ScientificWorkViewModel(x)).ToListAsync();

            var scientificWorkViewModelProperties = GetAllPropertyNameOfScientificWorkViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = string.Empty;

            foreach (var scientificWorkViewModelProperty in scientificWorkViewModelProperties)
            {
                var lowerTypeViewModelProperty = scientificWorkViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = scientificWorkViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(ScientificWorkViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ScientificWorkViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }
        public async Task<ScientificWorkViewModel> GetScientificWorkByIdAsync(Guid? id)
        {
            var scientificWork = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new ScientificWorkViewModel(scientificWork);
        }

        public async Task<ResponseModel> DeleteScientificWorkAsync(Guid id)
        {
            return await _scientificWorkResponstory.DeleteAsync(id);
        }

        public async Task<ResponseModel> CreateScientificWorkAsync(ScientificWorkManageModel scientificWorkManageModel)
        {
            var scientificWork = await _scientificWorkResponstory.FetchFirstAsync(x => x.Name == scientificWorkManageModel.Name && x.LevelId == scientificWorkManageModel.LevelId);
            if (scientificWork != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This ScientificWork is exist. Can you try again with the update!"
                };
            }
            else
            {
                scientificWork = _mapper.Map<ScientificWork>(scientificWorkManageModel);

                await _scientificWorkResponstory.InsertAsync(scientificWork);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ScientificWorkViewModel(scientificWork)
                };
            }
        }
        public async Task<ResponseModel> UpdateScientificWorkAsync(Guid id, ScientificWorkManageModel scientificWorkManageModel)
        {
            var scientificWork = await _scientificWorkResponstory.GetByIdAsync(id);
            if (scientificWork == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This ScientificWork is not exist. Please try again!"
                };
            }
            else
            {
                var existedScientificWorkOnMenu = await _scientificWorkResponstory.FetchFirstAsync(x => x.Name == scientificWorkManageModel.Name && x.LevelId == scientificWorkManageModel.LevelId && x.Id != id);
                if (existedScientificWorkOnMenu != null)
                {
                    var level = await _scientificWorkResponstory.GetByIdAsync(scientificWorkManageModel.LevelId);
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "ScientificWork " + existedScientificWorkOnMenu.Name + " already created on Level " + level.Name,
                    };
                }
                else
                {
                    scientificWorkManageModel.GetScientificWorkFromModel(scientificWork);
                    return await _scientificWorkResponstory.UpdateAsync(scientificWork);
                }
            }

        }
    }
}
