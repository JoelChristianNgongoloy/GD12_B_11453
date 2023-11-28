import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";

const FormLogin = () => {
    // Menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();

    // Membuat state user
     const [user, setUser] = useState({ username : "", password : "" });

     // Mengubah state user sesuai dengan inputan
     const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
     };

     // Menghandle submit form
     const handleSubmit = (event) => {
        event.preventDefault();

        // Validasi inputan
        if(user.username === "" || user.password === "") {
            toast.error("Username dan Password Tidak Boleh Kosong !");
            return;
        }else{
            // Menggunakan operator spread untuk menggabungkan data user yang ada di state dengan data baru loginAt
            const newUser = {
                ...user,
                loginAt: new Date(),
            };
            localStorage.setItem("user", JSON.stringify(newUser)); // Menyimpan data newUser di localstorage
            toast.success("Login Berhasil !");
            setTimeout(() => {
                navigate("/dashboard"); // Mengarahkan ke halaman dashboard
            }, 1000);
        }
     };

     return (
        <form onSubmit={handleSubmit} style={{maxWidth: "700px", margin: "auto"}}>
            <Alert variant="info">
                <strong>Info !</strong> Username dan password bebas, yang penting diisi.
            </Alert>
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                <Form.Control type="text" placeholer="name@example.com" name="username" onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholer="Password" name="password" onChange={handleChange} autoComplete="off" />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3 w-100">
                Login
            </Button>
        </form>
     );
};

export default FormLogin;