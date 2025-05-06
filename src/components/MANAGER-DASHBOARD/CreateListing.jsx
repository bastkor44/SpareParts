import { useState } from 'react';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: null,
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log('Form submitted:', Object.fromEntries(data.entries()));
    // You can send `data` to your backend using fetch or axios
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="w-full p-2 border rounded"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Fourwheeler">Fourwheeler</option>
          <option value="Twowheeler">Twowheeler</option>
        </select>
        <input
          type="text"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="w-full p-2 border rounded"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />
        <button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-800"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
