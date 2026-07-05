import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Doctors() {
  const emptyDoctor={name:"",specialization:"",phone:"",email:"",experience:""};
  const [doctors,setDoctors]=useState([]);
  const [doctor,setDoctor]=useState(emptyDoctor);
  const [isEditing,setIsEditing]=useState(false);
  const [editingId,setEditingId]=useState(null);

  useEffect(()=>{loadDoctors();},[]);

  const loadDoctors=async()=>{try{const r=await api.get("/doctors");setDoctors(r.data);}catch(e){alert("Failed to load doctors");}};
  const clearForm=()=>{setDoctor(emptyDoctor);setIsEditing(false);setEditingId(null);};
  const saveDoctor=async()=>{try{await api.post("/doctors",doctor);alert("Doctor Added Successfully");clearForm();loadDoctors();}catch(e){alert("Failed to add doctor");}};
  const editDoctor=(d)=>{setDoctor({name:d.name,specialization:d.specialization,phone:d.phone,email:d.email,experience:d.experience});setEditingId(d.doctorId);setIsEditing(true);};
  const updateDoctor=async()=>{try{await api.put(`/doctors/${editingId}`,doctor);alert("Doctor Updated Successfully");clearForm();loadDoctors();}catch(e){alert("Failed to update doctor");}};
  const deleteDoctor=async(id)=>{if(!window.confirm("Delete this doctor?"))return;try{await api.delete(`/doctors/${id}`);alert("Doctor Deleted Successfully");loadDoctors();}catch(e){alert("Failed to delete doctor");}};

  return (<MainLayout>
    <h2 className="mb-4">Doctors</h2>
    <div className="card mb-4"><div className="card-body">
      <h5>{isEditing?"Update Doctor":"Add Doctor"}</h5>
      <div className="row">
        <div className="col-md-4 mb-3"><input className="form-control" placeholder="Name" value={doctor.name} onChange={e=>setDoctor({...doctor,name:e.target.value})}/></div>
        <div className="col-md-4 mb-3"><input className="form-control" placeholder="Specialization" value={doctor.specialization} onChange={e=>setDoctor({...doctor,specialization:e.target.value})}/></div>
        <div className="col-md-4 mb-3"><input className="form-control" placeholder="Phone" value={doctor.phone} onChange={e=>setDoctor({...doctor,phone:e.target.value})}/></div>
        <div className="col-md-6 mb-3"><input className="form-control" placeholder="Email" value={doctor.email} onChange={e=>setDoctor({...doctor,email:e.target.value})}/></div>
        <div className="col-md-6 mb-3"><input type="number" className="form-control" placeholder="Experience" value={doctor.experience} onChange={e=>setDoctor({...doctor,experience:e.target.value})}/></div>
      </div>
      {isEditing?<>
      <button className="btn btn-warning me-2" onClick={updateDoctor}>Update Doctor</button>
      <button className="btn btn-secondary" onClick={clearForm}>Cancel</button>
      </>:<button className="btn btn-success" onClick={saveDoctor}>Save Doctor</button>}
    </div></div>
    <table className="table table-bordered table-hover">
      <thead className="table-dark"><tr><th>ID</th><th>Name</th><th>Specialization</th><th>Phone</th><th>Email</th><th>Experience</th><th>Actions</th></tr></thead>
      <tbody>{doctors.map(d=><tr key={d.doctorId}><td>{d.doctorId}</td><td>{d.name}</td><td>{d.specialization}</td><td>{d.phone}</td><td>{d.email}</td><td>{d.experience}</td><td><button className="btn btn-warning btn-sm me-2" onClick={()=>editDoctor(d)}>Edit</button><button className="btn btn-danger btn-sm" onClick={()=>deleteDoctor(d.doctorId)}>Delete</button></td></tr>)}</tbody>
    </table>
  </MainLayout>);
}
export default Doctors;
