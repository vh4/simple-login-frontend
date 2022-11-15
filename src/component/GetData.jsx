import React, {useEffect, useState} from 'react'
import axios from 'axios'
import RefreshToken from '../RefreshToken'

const GetData = () => {
    const [data, setData] = useState([]);
    const {token} = RefreshToken();
    const [isloading, setIsloading] = useState(true);

    useEffect(()=>{

        const getData = async () =>{
            try {
                const response = await axios.get("http://localhost:5000/api/users",{
                    headers:{
                      Authorization: `Bearer ${token}`
                    }
                  });
                  setData(response.data.data)
                  setIsloading(false);
            } catch (error) {
                console.log(error);
                setIsloading(false);
            }
        }

    getData();

    }, [token]);

    return (
        <div>
        {isloading && <div>Loading.........</div>}
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data, index) =>(
                 <tr key={index + 1}>
                 <th scope="row">{index  + 1}</th>
                 <td>{data.name}</td>
                 <td>{data.email}</td>
                 </tr>                   
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default GetData