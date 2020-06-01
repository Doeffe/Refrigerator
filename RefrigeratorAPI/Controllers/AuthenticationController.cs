using Microsoft.IdentityModel.Tokens;
using RefrigeratorAPI.Data;
using RefrigeratorAPI.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RefrigeratorAPI.Controllers
{
    // shall change to pointer http://localhost:4200/
    [EnableCors("*", "*", "*")]
    [RoutePrefix("auth")]
    public class AuthenticationController : ApiController
    {
        /// <summary>
        /// Sign in 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody]User user)
        {
            // check is user is null
            if (user == null) return BadRequest("No user requested");
            // chech required fields
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                return BadRequest("Plaese enter the required fields");

            try
            {               
                using (var context = new AppDbContext())
                {
                    // check if the user exists
                    var exists = context.Users.Any(u => u.UserName == user.UserName && u.Password == user.Password);
                    // send new token 
                    if (exists) return Ok(CreateToken(user));
                    // if credential is incorrect
                    return BadRequest("Wrong credentials");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        /// <summary>
        /// Registre new users
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Route("registre")]
        [HttpPost]
        public IHttpActionResult Registre([FromBody]User user)
        {
            // error handling
            if (user == null) return BadRequest("User not defined");
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                using (var context = new AppDbContext())
                {
                    if (context.Users.Any(u => u.UserName == user.UserName))
                        return BadRequest("User already exist");

                    context.Users.Add(user);
                    context.SaveChanges();

                    // return a user token
                    return Ok(CreateToken(user));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
          
        }

        /// <summary>
        /// Token generator
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private JwtPackage CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.Email, user.UserName)                
            });

            // edit key after test
            const string secretKey = "your secret goes here";
            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(secretKey));

            // signin credentials
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            // generate token
            var token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(
                subject: claims,
                signingCredentials: signingCredentials
                );

            // write token string
            var tokenString = tokenHandler.WriteToken(token);

            return new JwtPackage
            {
                Username = user.UserName,
                Token = tokenString
            };
        }
    }
}

/// <summary>
/// json web package
/// </summary>
public class JwtPackage
{
    public string Token { get; set; }
    public string Username { get; set; }
}
