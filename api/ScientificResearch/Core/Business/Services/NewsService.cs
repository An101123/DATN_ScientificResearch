using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.News_s;
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
    public interface INewsService
    {
        Task<PagedList<NewsViewModel>> ListNewsAsync(RequestListViewModel requestListViewModel);
        Task<News> GetNewsByIdAsync(Guid? id);
        Task<ResponseModel> CreateNewsAsync(NewsManageModel newsManageModel);
        Task<ResponseModel> DeleteNewsAsync(Guid id);
    }

    public class NewsService : INewsService
    {
        private readonly IRepository<News> _newsRepository;
        public NewsService(IRepository<News> newsRepository)
        {
            _newsRepository = newsRepository;
        }

        #region private method

        private IQueryable<News> GetAll()
        {
            return _newsRepository.GetAll().Where(i => !i.RecordDeleted);
        }

        private List<string> GetAllPropertyTitleOfNewsViewModel()
        {
            var newsViewModel = new NewsViewModel();

            var type = newsViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion

        public async Task<PagedList<NewsViewModel>> ListNewsAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Title.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new NewsViewModel(x)).ToListAsync();

            var newsViewModelProperties = GetAllPropertyTitleOfNewsViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = string.Empty;

            foreach (var newsViewModelProperty in newsViewModelProperties)
            {
                var lowerTypeViewModelProperty = newsViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = newsViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Title";
            }

            var type = typeof(NewsViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<NewsViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<News> GetNewsByIdAsync(Guid? id)
        {
            return await _newsRepository.GetByIdAsync(id);
        }

        public async Task<ResponseModel> CreateNewsAsync(NewsManageModel newsManageModel)
        {
            var news = await _newsRepository.FetchFirstAsync(x => x.Title == newsManageModel.Title);
            news = new News();
            newsManageModel.GetNewsFromModel(news);
            await _newsRepository.InsertAsync(news);
            return new ResponseModel
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new NewsViewModel(news),
            };
        }

        public async Task<ResponseModel> DeleteNewsAsync(Guid id)
        {
            return await _newsRepository.DeleteAsync(id);
        }

    }
}

