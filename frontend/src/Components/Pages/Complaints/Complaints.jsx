import React from 'react'
import "./complaints.css"
import { Link } from "react-router-dom";
//import { Rating } from "@material-ui/lab";

const Complaints = () => {
    const options = {
        value: Complaints.ratings,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <Link className="complaintsCard" to={`/complaints/${Complaints._id}`}>
      <img src={Complaints.images[0].url} alt={Complaints.name} />
      <p>{Complaints.name}</p>
      <div>
        {/* <Rating {...options} />{" "} */}
        <span className="complaintsCardSpan">
          ({Complaints.numOfReviews} Reviews)
        </span>
      </div>
      
    </Link>
  )
}

export default Complaints;