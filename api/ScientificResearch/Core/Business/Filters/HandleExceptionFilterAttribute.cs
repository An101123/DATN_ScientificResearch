using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ScientificResearch.Core.Business.Exceptions;
using ScientificResearch.Core.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Filters
{
    public class HandleExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly ILogger _logger;

        public HandleExceptionFilterAttribute(ILogger<HandleExceptionFilterAttribute> logger)
        {
            _logger = logger;
        }

        /// Handle different types of exceptions
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is DbUpdateException)
            {
                HandleDbUpdateException(context);
                return;
            }
            //Custom define exception
            //This hasn't used yet
            if (context.Exception is DatabaseException)
            {
                HandleDataBaseException(context);
                return;
            }
            if (context.Exception is BusinessRuleException)
            {
                HandleBusinessException(context);
                return;
            }
            //Any other unhandled exceptions are logged and returned as bad request
            context.HttpContext.Response.StatusCode = 500;
            //Detail of error
            //context.Result = new JsonResult(context.Exception);
            //context.Result = new JsonResult(ErrorConstants.Common.InternalServerError);

            _logger.LogError(context.Exception, "General Error");
            base.OnException(context);
        }

        private void HandleDbUpdateException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, "DbUpdate Exception");
            context.HttpContext.Response.StatusCode = 500;
            context.Result = new JsonResult(context.Exception.Message);
        }

        private void HandleBusinessException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, "Business Exception");
            context.HttpContext.Response.StatusCode = 400;
            context.Result = new JsonResult(context.Exception.Message);
        }

        private void HandleDataBaseException(ExceptionContext context)
        {
            var databaseException = context.Exception as DatabaseException;
            if (databaseException != null)
            {
                _logger.LogError(context.Exception, "DataBase Exception: " + databaseException.ExceptionType.ToString());
                if (databaseException != null && databaseException.ExceptionType == DatabaseExceptionType.EntityNotFound)
                {
                    context.HttpContext.Response.StatusCode = 404;
                    context.Result = new JsonResult(context.Exception.Message);
                }
                else
                {
                    context.HttpContext.Response.StatusCode = 500;
                    context.Result = new JsonResult(context.Exception.Message);
                }
            }
            else
            {
                _logger.LogError(context.Exception, "Error Exception");
                context.HttpContext.Response.StatusCode = 500;
                context.Result = new JsonResult(context.Exception.Message);
            }
        }
    }
}

