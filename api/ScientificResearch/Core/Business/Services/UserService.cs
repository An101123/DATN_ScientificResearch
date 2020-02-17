using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.Users;
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
    public interface IUserService
    {
        Task<PagedList<UserViewModel>> ListUserAsync(RequestListViewModel requestListViewModel);
        Task<ResponseModel> RegisterAsync(UserManageModel userManageModel);
        Task<ResponseModel> DeleteUserAsync(Guid id);
        Task<UserViewDetailModel> GetUserByIdAsync(Guid? id);
        Task<ResponseModel> UpdateProfileAsync(Guid id, UserManageModel userManageModel);
        Task<UserViewDetailModel> GetUserByEmailAsync(string email);
        Task<ResponseModel> LoginAsync(UserLoginModel userLoginModel);
        Task<User> GetUserByUsernameAsync(string username);

    }

    public class UserService : IUserService
    {
        #region Fields

        private readonly IRepository<User> _userRepository;
        private readonly IMapper _mapper;

        #endregion

        #region Constructor

        public UserService(IRepository<User> userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        #endregion

        #region Base Methods

        #endregion

        #region Private Methods

        private IQueryable<User> GetAll()
        {
            return _userRepository.GetAll();

        }

        private List<string> GetAllPropertyNameOfUserViewModel()
        {
            var userViewModel = new UserViewModel();
            var type = userViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion

        #region Other Methods

        public async Task<PagedList<UserViewModel>> ListUserAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
            .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.FullName.Contains(requestListViewModel.Query)
                    || (x.Email.Contains(requestListViewModel.Query)
                    ))))
                .Select(x => new UserViewModel(x)).ToListAsync();

            var userViewModelProperties = GetAllPropertyNameOfUserViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = userViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Username";
            }

            var type = typeof(UserViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<UserViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ResponseModel> RegisterAsync(UserManageModel userManageModel)
        {
            var user = _mapper.Map<User>(userManageModel);

            await _userRepository.InsertAsync(user);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new UserViewModel(user)
            };
        }

        public async Task<ResponseModel> UpdateProfileAsync(Guid id, UserManageModel userManageModel)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "User is not exist. Please try again!"
                };
            }
            else
            {
                userManageModel.SetUserModel(user);
                await _userRepository.UpdateAsync(user);
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new UserViewDetailModel(user)
                };
            }
        }

        public async Task<ResponseModel> DeleteUserAsync(Guid id)
        {
            return await _userRepository.DeleteAsync(id);
        }

        public async Task<UserViewDetailModel> GetUserByIdAsync(Guid? id)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new UserViewDetailModel(user);
        }

        public async Task<UserViewDetailModel> GetUserByEmailAsync(string email)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Email == email);
            return new UserViewDetailModel(user);
        }

        public async Task<ResponseModel> LoginAsync(UserLoginModel userLoginModel)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Username == userLoginModel.Username && x.Password == userLoginModel.Password);
            if (user == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "Username or password is wrong"
                };
            }
            else
            {
                return new ResponseModel
                {
                    Data = new UserViewModel(user),
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Message = "Login success"
                };
            }
        }
        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Username == username);
        }

        #endregion
    }
}
