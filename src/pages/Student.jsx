import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { GET_STUDENTS, DELETE_STUDENTS, UPDATE_STUDENTS, CREATE_STUDENTS } from "../stores/modules/students/students-actions";

import { QRCodeCanvas } from "qrcode.react";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

const Student = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [choose, setChoose] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [tempItem, setTempItem] = useState({
    id: 0,
    name: "",
    email: "",
    gender: "",
    address: "",
  });

  const getStudentByIdAPI = async (id) => {
    const data = props.students.filter((data) => data.id === id);
    setTempItem(data[0]);
  };

  const toggleModal = (data, id) => {
    switch (data) {
      case 0:
        setChoose(0);
        clearForm();
        break;
      case 1:
        setChoose(1);
        getStudentByIdAPI(id);
        break;
      case 2:
        setChoose(2);
        setItemId(id);
        break;
    }
    setIsOpenModal(!isOpenModal);
  };

  const handleChange = (e) => {
    setTempItem({ ...tempItem, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    const data = {
      id: 0,
      name: "",
      email: "",
      gender: "",
      address: "",
    };
    setTempItem(data);
  };

  const updateConfirm = async () => {
    props.updateStudent(tempItem);
    setIsOpenModal(!isOpenModal);
  };

  const addConfirm = async () => {
    const data = {
      id: props.students.length + 1,
      name: tempItem.name,
      email: tempItem.email,
      gender: tempItem.gender,
      address: tempItem.address,
    };
    props.addStudent(data);
    setIsOpenModal(!isOpenModal);
    clearForm();
  };

  const deleteConfirm = async () => {
    props.deleteStudent(itemId);
    setIsOpenModal(!isOpenModal);
    clearForm();
  };

  useEffect(() => {
    if (props.students.length === 0) {
      props.getStudent();
    }
  }, []);

  return (
    <div>
      <button onClick={() => toggleModal(0, null)}>Add Data</button>
      <Modal isOpen={isOpenModal} toggleModal={""}>
        {choose === 0 && (
          <div>
            <div className="row">
              <label>Name:</label>
              <input type="text" id="name" name="name" value={tempItem.name || ""} onChange={handleChange} />
              <label>NIM:</label>
              <input type="text" id="nim" name="nim" value={tempItem.nim || ""} onChange={handleChange} />
              <label>Email:</label>
              <input type="text" id="email" name="email" value={tempItem.email || ""} onChange={handleChange} />
              <label>Gender:</label>
              <input type="text" id="gender" name="gender" value={tempItem.gender || ""} onChange={handleChange} />
              <label>Address:</label>
              <input type="text" id="address" name="address" value={tempItem.address || ""} onChange={handleChange} />
            </div>
            <button onClick={toggleModal}>Cancel</button>
            <button onClick={addConfirm}>Add</button>
          </div>
        )}
        {choose === 1 && (
          <div>
            <div className="row">
              <label>Name:</label>
              <input type="text" id="name" name="name" value={tempItem.name || ""} onChange={handleChange} />
              <label>NIM:</label>
              <input type="text" id="nim" name="nim" value={tempItem.nim || ""} onChange={handleChange} />
              <label>Email:</label>
              <input type="text" id="email" name="email" value={tempItem.email || ""} onChange={handleChange} />
              <label>Gender:</label>
              <input type="text" id="gender" name="gender" value={tempItem.gender || ""} onChange={handleChange} />
              <label>Address:</label>
              <input type="text" id="address" name="address" value={tempItem.address || ""} onChange={handleChange} />
            </div>
            <button onClick={toggleModal}>Cancel</button>
            <button onClick={updateConfirm}>Update</button>
          </div>
        )}
        {choose === 2 && (
          <div>
            <div className="content">Apakah anda yakin ingin menghapus item ini ?</div>
            <button onClick={toggleModal}>Cancel</button>
            <button onClick={deleteConfirm}>Delete</button>
          </div>
        )}
      </Modal>
      <div className="row">
        {props.students.length > 0 &&
          props.students.map((data, index) => (
            <div className="column" key={index}>
              <div className="card">
                <div className="container">
                  <p>name: {data.name}</p>
                  <p>email: {data.email}</p>
                  <p>gender: {data.gender}</p>
                  <p>address: {data.address}</p>
                  <QRCodeCanvas value={data.nim} />
                  <div className="row">
                    <button onClick={() => toggleModal(1, data.id)}>Edit</button>
                    <button onClick={() => toggleModal(2, data.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {props.loading && (
          <div className="column">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

// Get state to props
const mapStateToProps = (state) => ({
  loading: state.students.loading,
  students: state.students.students,
});

// Get function to props
const mapDispatchToProps = (dispatch) => ({
  getStudent: () => dispatch({ type: GET_STUDENTS }),
  addStudent: (payload) => dispatch({ type: CREATE_STUDENTS, payload: payload }),
  deleteStudent: (id) => dispatch({ type: DELETE_STUDENTS, payload: id }),
  updateStudent: (payload) => dispatch({ type: UPDATE_STUDENTS, payload: payload }),
});

// register it using connect
export default connect(mapStateToProps, mapDispatchToProps)(Student);
