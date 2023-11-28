import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const DashboardPage = () => {
    // Menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();

    // Mengambil data user dari local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // Menghandle jika user belum login
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user) {
            navigate("login");
        }
    }, [navigate]);

    // Mengubah format tanggal 
    const formatDate = (date) => {
        const options = {
            weekday : "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat Datang</h4>
                            <h1 className="fw-bold diplay-6 mb-3">{user?.username}</h1>
                            <p className="mb-0">Kamu Sudah Login Sejak : </p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti Sedang Ngantor : </p>
                            <img src="https://via.placeholder.com/150" className="img-fluid-rounded" alt="Tidak Ada Gambar" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;