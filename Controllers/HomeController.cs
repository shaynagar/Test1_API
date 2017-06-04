using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Test1_API.Controllers
{
    public class HomeController : Controller
    {
        Test1DBEntities db = new Test1DBEntities();
        public ActionResult Index()
        {
            var sid = Session["UserId"];
            ViewBag.Title = "Home Page";
            if(Session["UserId"] != null)
            {
                User user = db.Users.Find(Session["UserId"]);
                ViewBag.username = user.FirstName + " " + user.LastName;
                ViewBag.lastConnected = user.Logs.OrderByDescending(l => l.LoginTime).First().LoginTime;
                return View();
            }
            return RedirectToAction("Login");
        }

        public ActionResult Register() // Simple registration with Validation
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
    }
}
