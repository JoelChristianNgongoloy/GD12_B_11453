import { Container, Row, Col } from "react-bootstrap";

// Import Component
import ImageCarousel from "../components/ImageCarousel";

// Import Gambar
import imgHotel1 from "../assets/images/hotel1.jpg";
import imgHotel2 from "../assets/images/hotel2.jpg";
import imgHotel3 from "../assets/images/hotel3.jpg";
import imgFeaturette1 from "../assets/images/featurette-1.jpeg";
import imgFeaturette2 from "../assets/images/featurette-2.jpeg";

// Gambar yang akan ditampilkan di carousel
const images = [
    {
        img: imgHotel1,
        title: "First Slide Table.",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
        img: imgHotel2,
        title: "Second Slide Table.",
        description: "Lorem ipsum dolor sit amet, consectur adispicing elit.",
    },
    {
        img: imgHotel3,
        title: "Third Slide Table.",
        description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
];

const HomePage = () => {
    return (
        <>
            <ImageCarousel images={images} />
            <Container className="mt-5">
                <Row>
                    <Col md={7}>
                        <h2 className="fw-normal">
                            Hotel pertama dan satu satunya <strong>yang fiksional</strong>.
                        </h2>
                        <p className="lead">
                            Diciptakan oleh <strong>[[ Devin Ganiputra Hernando ]]</strong>, mahasiswa Universitas Atma Jaya Yogyakarta dari program studi informtika.
                        </p>
                        <p className="lead">
                            Nomor pokok Mahasiswa : <strong>[[ 210711453 ]]</strong>.
                        </p>
                    </Col>
                    <Col md={5}>
                        <img src={imgFeaturette1} className="img-fluid mx-auto rounded shadow" role="img" aria-label="Gambar featurette 1" />
                    </Col>
                </Row>
                <hr className="mt-5 mb-5" />
                <Row>
                    <Col md={7} className="order-md-2">
                        <h2 className="fw-normal">
                            Your comfort is key <strong>experience the heartbeat of our hotel</strong>.
                        </h2>
                        <p className="lead">
                            Our modern, sophisticated guest room are designed to exceed expectations with premium comfort, technology where you need it and thoughful attention to detail.
                        </p>
                    </Col>
                    <Col md={5} className="order-md-1">
                    <img src={imgFeaturette2} className="img-fluid mx-auto rounded shadow" role="img" aria-label="Gambar featurette 2" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;