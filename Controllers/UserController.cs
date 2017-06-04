using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Test1_API.Models;

namespace Test1_API.Controllers
{
    public class UserController : Controller
    {
        Test1DBEntities db = new Test1DBEntities();
        LogController logController = new LogController();

        [HttpPost]
        public JsonResult Login(LoginData userData)
        {
            string message = "";
            User user = new User();
            if (ModelState.IsValid)
            {
                user = db.Users.Where(u => u.UserName == userData.Username && u.Password == userData.Password).FirstOrDefault();
                if(user != null)
                {
                    message = "Success";
                    Log log = new Log();
                    log.LoginTime = DateTime.Now;
                    log.UserId = user.UserId;
                    log.SessionId = HttpContext.Session.SessionID;
                    logController.PostLog(log);
                    Session["UserId"] = user.UserId;
                }
                else
                {
                    message = "Wrong username or password";
                }
            }
            else
            {
                message = "Username and password required";
            }
            JsonResult json = new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            return json;
        }

        [HttpPost]
        public JsonResult AddUser(User user)
        {
            string message = "";
            //Here we will save data to the database
            if (ModelState.IsValid)
            {
                using (db)
                {
                    //check username available
                    var existUser = db.Users.Where(a => a.UserName.Equals(user.UserName)).FirstOrDefault();
                    if (existUser == null)
                    {
                        //Save here
                        db.Users.Add(user);
                        db.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Username not available!";
                    }
                }
            }
            else
            {
                ModelState.Values.ToList().ForEach(msv => msv.Errors.ToList().ForEach(e => message += (e.ErrorMessage + "\n")));
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}