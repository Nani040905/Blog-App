import { NavLink } from "react-router"
import { useAuth } from "../stores/authStore"

function Header() {

  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const logout = useAuth((state) => state.logout)
  const currentUser = useAuth((state)=>state.currentUser)

  return (
    <nav className=" top-0 w-full bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5 my-8">
          <NavLink to="/" className="text-xl font-bold text-gray-900">
            Blog App
          </NavLink>
          </div>
          

          {/* Navigation */}
          <div className="flex items-center gap-6">

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* Dashboard NavLink */}
                <NavLink 
                  to={currentUser.role === "USER" ? "/user-dashboard" : currentUser.role === "AUTHOR" ? "/author-dashboard" : "/admin-dashboard"}
                  className={({isActive}) => 
                    isActive 
                      ? "text-sm  text-white bg-black  py-2 px-4 rounded-2xl" 
                      : "text-sm text-gray-400 hover:text-gray-900 transition-colors py-2 px-4 hover:bg-gray-100 rounded-2xl "
                  }
                >
                  Dashboard
                </NavLink>


                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-900 leading-none">
                    {currentUser.firstName} {currentUser.lastName}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                    {currentUser.role}
                  </span>
                </div>
                
                <NavLink 
                  to="/profile"
                  className="relative group cursor-pointer"
                >
                  <img
                    src={currentUser.profileImageUrl || `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAOVBMVEWmpqb////y8vKjo6P19fX4+Pj8/PygoKDu7u61tbWqqqrNzc2ysrLg4OCcnJy7u7vExMTY2Njn5+fXGCFKAAAHeUlEQVR4nM2cjdabIAyGrQFR1CLe/8UOa/u1Kn9v0Hbv2XZ2tqnPAoRAAtWtWI1oZ9ubYdAVPVTpwZh+nNu6KX97VQg328kMlVLKcX2Klj/SZrJzIWQBYCOs0Q+LBbX8rTZWFEByAZu575yNwmwbY3Y925A8wKbvqjy6F2PV9TxEBqCcu3usXUOQ926WXwBsbIfYbmvHzsJmBAGbXjOM90YkjbY0BCitVny6VUpbqKERwHEoMN6HGYfxEsB6KLbeS2qoTwds+uoU862iKrsrZgK2+kS8RWpozwTsS4auX6T60wCFOa33fUoZcQ7gzHXMKRHNZwDa85v3jWjLAafr8BbCqRBQXtP93lImMa/EAZvuYj5H2MU9YhRQlk+9aZGO2jAGKM6Ze5OEQ8zdRACbs2ePIKGOtHIYUHZf4nOEXbiVw4Dma3yO0OCAV/uXrVSQMATYf9F+iygUOgQAxy/zORsGwmw/YH3/Nl9V3f1RthfwiwP4Q/6h7AWcvjpAXlLewMEHOP6ggRfdfd3QA1jr3/BVlfZ0wyNgc20EGJMvOjwCjj/pgKs8vuYI+DP7LaI0YP9DAzoTHiaUPWD7sxGySu/X83vA37jAtw5Rww6w/jGfI6yjgD+Z4zbah4ZbwPnXeIvmCGCZj15zJvHMScZbpjBgy38zqWowU//QI/dU8Ko2CMj2gXQf+rGthZRi+Vm3Yz/cuYhbX/gJ2HDTC3pqHdVGQrYTd9lKTQDQsl5I1M97vBVxZm4bb/a8PgAb1kKTutlDtyKKluW2yDReQI6PIbI+672taFmjZfYCWnyIUDXKMN4iaRnNrKwXEH5PRUMbMd/TiKwEgQ8QX2qSDna/T8IZJ/xYgr4B8b0EPWbwOcIRDuE+9hnegPCAU6n+95LEVxHDERBey6kpk88RwlHmO279A0S9NHW5eIvQ5qHxAIjOw5TXAVcJdDPqPR+/ANFphLrsBn40MmhC+tv7fwEK6Hn3X5wRvrqe0V4odoAt5gXJAA38ENhC93YHCM5zZEFAAQ7Cv9nuBQgG+7oFDViDC+6/wP8FOGCPG2iILJJgGw87QOhh1wBoF3RhDThMtoASe/gOjuF6iRnAYERuAGdwjMEt7EwI+ol5AwhO55oDCI6ScQMIOoGBAwiOQ7sBxIJBxiCGh/FrNv5vAakMEPYypYDYRPIVC04FgBUWaz0BO+gTZYAVBxD7QhngndEHBeioywBzFsQ7PnCqKwNUPR7NgIueHSC6au9wC2JjpMwPuskYbWMxg+vuQkDqUUD8C9tgAXu6ogHjq2u0zGoXLMBVHgpZty8rd3TZqbbhFhiwLibEFu7wFtwuYAXdfAUuPAXahap9yM/YXkVWnpwk720LiIW7iyjfF3LqcPbLTkaWTuW6GsHIYB0W7owt/qrK64acDnjc+gA3j15vySCEV+wPHTaP0O23h9JpEqb93Kv322+8PNjSD6NGFPAU9+Qz+w1MbkWjmmJhg5iZRRrHLWB2SSPpYLZOSMvOyB430fklZWqwtS8dW1v+ISNPGuIGBpQfIjJ922w6o2ja3vBrF6i7HQFLymqJaOjndjHb8qOd+6GotMKbCoOSiXQM75SqOjM5mW75ffqBiLzJRCBeIBprX501PXX8G2XqETHpzQeY7fFpcu0okdmbJlnLOvuJQEI7sySAnkGCyDYJPdNmLmjIfMJfEpA3mbyz2KLNGqdUmfY5Ico5qyeGiiqytlk/qwCEyPB0zku+HZBocwhDZSk5hT3UbaoUnDNOnXG32wdyClWChT3plCyZ/bQmhe20v2st58at3IU7Ir1NGC6NShaXkfGsQ0Q99vq+ZyR11/3omQKXnpv4Sri4LBH4u9W6NywQQrTWDI/JfG1wPRjXtP5ITCTW8LHyvLinIR2pkpFyua/C2r53v8ytjNQjpSppYgWO0XNCySIA8afEv4uFdh9xgg8wUmSrLGPf1y8ZcWiJIttwmbLi7OyH1ARPTKXKlIOF3s5Bn8fnArLQRkGy0DvkC6EqlLRC3TBdKh84bMBK3cQU8Nd0OKOYeVyDzsVb5APMOq7hO/AC7/im5Vsw03Q85Ok9MnR49NwRssozTvKODHkOXTHSImkd92xyD10dnaE6vYEfhPuvZB9bu+0Sk5cY8JB7CpzhDRyd3P7n8CKULG1Dk/0cFwXc+Boy1/BtC84IOny62WeAC8ly9Vlwhh7f3RyAvsDHrGrf7QsfgH6Hhm4ReBVg8/5GECN9CJ9RSJYr8XSF1IUvMojds7DOKOqyFnZt/ABkXmPwvAgCK0cGtX6BexGEI9QqP13DkpuzSEfvxUncltKp6txIdSvnaIouI1muc8GrVRHAuSq7zsXpujG8qE3ezJS+UugyL7gofftWxqVMFxJm3A6Wde/WVXNxzrfzLga7Jh7M+nTm1WrN+UbMvPwtE/B0I2bfQZgNeK4R869xzAc8ERG5ZRIBPKmdJXQLJgZ4AiJ60ykK6BALGlrgF7HigPy+yLoSmAN445iRYbwSQGdGhFFgA+MUwHzGArpCwBVShrMOQpTBnQH4gHTaZkceZE4nvPwfrlNttWEe0oIAAAAASUVORK5CYII=`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-200 object-cover group-hover:border-blue-500 transition-all shadow-sm"
                  />
                </NavLink>

                <button 
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                  className="text-sm text-red-500 hover:text-red-700 cursor-pointer ml-2 bg-red-200 px-4 py-2 rounded-2xl"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="login"
                  className={({isActive}) =>
                    isActive
                      ? "text-sm font-medium text-white bg-black px-4 py-2 rounded"
                      : "text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="register"
                  className={({isActive}) =>
                    isActive
                      ? "text-sm font-medium text-white bg-black px-4 py-2 rounded"
                      : "text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded"
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header