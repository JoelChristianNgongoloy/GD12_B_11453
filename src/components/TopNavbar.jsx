import { useNavigate, useLocation} from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { toast } from "sonner";

//Mengimport gambar logo
import imgCrown from "../assets/images/crown.png";

const TopNavbar = ({ routes }) => {
    //Menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();

    //Menggunakan hook useLocation untuk mengambil path
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user"); // Menghapus data user di local storage
        toast.success("Logout Berhasil !");
        setTimeout(() => {
            navigate("/login"); // mengarahkan ke halaman login
        }, 1000);
    };

    console.log(routes);
    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" className="bg-body-tertiary shadow">
            <Container>
                <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    <div className="d-flex align-items-center">
                        <img alt="Crown Logo" src={imgCrown} width="50" height="50" className="d-inline-block align-top" />
                        <div className="ms-2">
                            <p className="mb-0 fs-5 fw-bold">Grand Atma</p>
                            <p className="small mb-0">Hotel & Resort</p>
                        </div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {routes?.map((route, index) => (
                            <Nav.Link key={index} onClick={() => navigate(route.path)}>
                                <Button variant={location.pathname === route.path ? "primary" : "light"} className="w-100">
                                    {route.name} 
                                </Button>
                            </Nav.Link>
                        ))}
                        {location.pathname === "/dashboard" ? (
                            <Nav.Link>
                                <Button variant="danger" className="w-100" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Nav.Link>
                        ) : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNavbar;