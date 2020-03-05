using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.Levels;
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
    public interface ILevelService
    {
        Task<List<LevelViewModel>> GetAllLevel();
        Task<PagedList<LevelViewModel>> ListLevelAsync(RequestListViewModel requestListViewModel);
        Task<Level> GetLevelByIdAsync(Guid? id);
        Task<ResponseModel> CreateLevelAsync(LevelManageModel levelManagerModel);
        Task<ResponseModel> UpdateLevelAsync(Guid id, LevelManageModel levelManagerModel);
        Task<ResponseModel> DeleteLevelAsync(Guid id);
    }
    public class LevelService : ILevelService
    {
        private readonly IRepository<Level> _repository;
        private readonly IMapper _mapper;

        public LevelService(IRepository<Level> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        #region private method


        private IQueryable<Level> GetAll()
        {
            return _repository.GetAll().Where(i => !i.RecordDeleted);
        }

        private List<string> GetAllPropertyNameOfLevelViewModel()
        {
            var levelViewModel = new LevelViewModel();

            var type = levelViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion
        public async Task<List<LevelViewModel>> GetAllLevel()
        {
            var list = await GetAll().Select(x => new LevelViewModel(x)).ToListAsync();
            return list;
        }

        public async Task<PagedList<LevelViewModel>> ListLevelAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new LevelViewModel(x)).ToListAsync();

            var levelViewModelProperties = GetAllPropertyNameOfLevelViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = string.Empty;

            foreach (var levelViewModelProperty in levelViewModelProperties)
            {
                var lowerTypeViewModelProperty = levelViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = levelViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(LevelViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<LevelViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<Level> GetLevelByIdAsync(Guid? id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<ResponseModel> CreateLevelAsync(LevelManageModel levelManageModel)
        {
            var level = await _repository.FetchFirstAsync(x => x.Name == levelManageModel.Name);
            if (level != null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Level is exist"
                };
            }
            else
            {
                level = new Level();
                levelManageModel.GetLevelFromModel(level);
                await _repository.InsertAsync(level);
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new LevelViewModel(level),
                };
            }
        }

        public async Task<ResponseModel> UpdateLevelAsync(Guid id, LevelManageModel levelManageModel)
        {
            var level = await _repository.GetByIdAsync(id);
            if (level == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This level is not exist"
                };
            }
            else
            {
                var existedLevelName = await _repository.FetchFirstAsync(x => x.Name == levelManageModel.Name && x.Id != id);
                if (existedLevelName != null)
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Level " + levelManageModel.Name + " is exist on system. Please try again!",
                    };
                }
                else
                {
                    levelManageModel.GetLevelFromModel(level);
                    return await _repository.UpdateAsync(level);
                }
            }
        }

        public async Task<ResponseModel> DeleteLevelAsync(Guid id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
