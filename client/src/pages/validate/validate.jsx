import React, { useState } from "react";
import Challenges from "./Challenges";

const validate = ({PUF,ipfs,user}) => {

  const [challenges, setChallenges] = useState([
    "Xd029Fbk",
    "nTU4L8Ew",
    "ufbtytzQ",
    "IHZkHYRt",
    "kmJ3HTL7",
    "gkijnFJ0",
    "tTegClpt",
    "YsLA4ExP",
    "2wlsVny3",
    "ha2i0sTF",
  ]);

  return (
    <div>
      <Challenges 
      challenges={challenges} 
      PUF={PUF}
      ipfs={ipfs}
      user={user}/>
    </div>
  )
}

export default validate;