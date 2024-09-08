import { useContext, useState, useEffect,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./updatePostPage.scss"
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import apiRequest from "../../lib/apiRequest";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function UpdatePostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    price: "",
    address: "",
    city: "",
    bedroom: "",
    bathroom: "",
    type: "",
    property: "",
    latitude: "",
    longitude: "",
    utilities: "",
    pet: "",
    income: "",
    size: "",
    school: "",
    bus: "",
    restaurant: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await apiRequest.get(`/posts/${id}`);
        console.log("Fetched post data:", res.data); // Log the fetched data
        setPostData({
          title: res.data.title,
          price: res.data.price,
          address: res.data.address,
          city: res.data.city,
          bedroom: res.data.bedroom,
          bathroom: res.data.bathroom,
          type: res.data.type,
          property: res.data.property,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          utilities: res.data.postDetail.utilities,
          pet: res.data.postDetail.pet,
          income: res.data.postDetail.income,
          size: res.data.postDetail.size,
          school: res.data.postDetail.school,
          bus: res.data.postDetail.bus,
          restaurant: res.data.postDetail.restaurant,
        });
        setValue(res.data.postDetail.desc);
        setImages(res.data.images);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch post data");
      }
    };

    fetchPostData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.put(`/posts/${id}`, {
        postData: {
          title: postData.title,
          price: parseInt(postData.price),
          address: postData.address,
          city: postData.city,
          bedroom: parseInt(postData.bedroom),
          bathroom: parseInt(postData.bathroom),
          type: postData.type,
          property: postData.property,
          latitude: postData.latitude,
          longitude: postData.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: postData.utilities,
          pet: postData.pet,
          income: postData.income,
          size: parseInt(postData.size),
          school: parseInt(postData.school),
          bus: parseInt(postData.bus),
          restaurant: parseInt(postData.restaurant),
        },
      });
      navigate("/" + id);
    } catch (err) {
      console.log(err);
      setError("Failed to update post");
    }
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="updatePostPage">
      <div className="formContainer">
        <h1>Update Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={postData.title}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={postData.price}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={postData.address}
                onChange={handleChange}
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                theme="snow"
                onChange={setValue}
                value={value}
                ref={quillRef}
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={postData.city}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                value={postData.bedroom}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                value={postData.bathroom}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                value={postData.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                value={postData.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" value={postData.type} onChange={handleChange}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select
                name="property"
                value={postData.property}
                onChange={handleChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select
                name="utilities"
                value={postData.utilities}
                onChange={handleChange}
              >
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" value={postData.pet} onChange={handleChange}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                value={postData.income}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                min={0}
                id="size"
                name="size"
                type="number"
                value={postData.size}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                min={0}
                id="school"
                name="school"
                type="number"
                value={postData.school}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input
                min={0}
                id="bus"
                name="bus"
                type="number"
                value={postData.bus}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
                value={postData.restaurant}
                onChange={handleChange}
              />
            </div>
            <button className="sendButton">Update</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dznynahvp",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default UpdatePostPage;