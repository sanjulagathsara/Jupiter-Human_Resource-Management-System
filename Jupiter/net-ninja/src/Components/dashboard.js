import{ useNavigate, Link } from 'react-router-dom';
import React from 'react';
// const image = "https://www.forbes.com/advisor/wp-content/uploads/2022/11/Image-12.jpg";

// const Dashboard = () => {
//     const navigate =useNavigate()
//     return (  <div>
//         <h1 className='h1'>Jupiter</h1>
//       <h2 className='h2'>Human Resource Management System</h2>
      

//       <img src={image} className = "image" alt = "HR Management System"/>
//       <div>
//             <span className={"sparkle-button"}><button onClick={navigate('/login')}><b>Login</b></button></span>
//             <span className={"sparkle-button"}><button onClick={navigate('/about')}><b>About</b></button></span>
            
//       </div>
//     </div>);
// }
 
// export default Dashboard;


const image = "https://www.forbes.com/advisor/wp-content/uploads/2022/11/Image-12.jpg";

const Dashboard = () => {

  return (
    <div>
      <h1 className='h1'>Jupiter</h1>
      <h2 className='h2'>Human Resource Management System</h2>

      <img src={image} className="image" alt="HR Management System" />
      <div>
        
        <span class="sparkle-button">
          <Link to="/login">
          <button className={"sparkle-button"}>Login</button>
            </Link>
        </span>
        <span class="sparkle-button">
            <Link to="/about">
                <button className={"sparkle-button"}>About</button>
            </Link>
        </span>
      </div>
    </div>
  );
}

export default Dashboard;

