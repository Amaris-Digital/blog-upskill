import "./settings.css"
import Sidebar from "../../sidebar/Sidebar"

export default function Settings() {
  return (
    <div className="settings">
    <div className="settingsWrapper">
      <div className="settingsTitle">
        <span className="settingsUpdateTitle">Update Your Account</span>
        <span className="settingsDeleteTitle">Delete Account</span>
      </div>
      <form 
       className="settingsForm">
         <label>Profile Picture</label>
         <div className="settingsPP">
           <img 
           src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
           alt="" 
           />
          <label htmlFor="fileInput">
          <i className="settingsPPIcon fa-solid fa-circle-user"></i>
          </label>
          <input type="file" id="fileInput" style={{display:"none"}}/>
         </div>
         <label>Username</label>
         <input type="text" placeholder="Brian" />
         <label>Email</label>
         <input type="email" placeholder="brian@gmail.com" />
         <label>Password</label>
         <input type="password"/>
         <button className="settingsSubmit">Update</button>
      </form>
    </div>
    <Sidebar />
    </div>
  )
}

