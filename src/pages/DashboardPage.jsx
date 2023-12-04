import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Toast,
  Dropdown,
} from "react-bootstrap";
import { FaPlus, FaSave } from "react-icons/fa";

const DashboardPage = () => {
  // Menggunakan hook useNavigate untuk mengatur navigasi
  const navigate = useNavigate();

  // Mengambil data user dari local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const [editingRoomId, setEditingRoomId] = useState(null);

  // Menghandle jika user belum login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("login");
    }
  }, [navigate]);

  // Mengubah format tanggal
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const getImagePath = (roomType) => {
    switch (roomType) {
      case "Standard":
        return "assets/images/gambar1.jpg";
      case "Superior":
        return "assets/images/gambar2.jpg";
      case "Luxury":
        return "assets/images/gambar3.jpg";
      default:
        return "";
    }
  };
  
  const [showToastSuccess, setShowToastSucess] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const [newRoomType, setNewRoomType] = useState("");
  const [newRoomPrice, setNewRoomPrice] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [totalRooms, setTotalRooms] = useState(0);
  const [imageType, setImageType] = useState("");

  const renderRooms = () => {
    return rooms.map((room) => (
      <Card key={room.id} className="mb-2">
        <Card.Body>
          {imageType && (
            <img
              src={getImagePath(room.type)}
              alt="Gambar Kamar"
              className="img-fluid rounded mb-2"
            />
          )}
          <p>
            <strong>Nama Kamar:</strong> {room.name}
          </p>
          <p>
            <strong>Tipe Kamar:</strong> {room.type}
          </p>
          <p>
            <strong>Harga Kamar:</strong> {room.price}
          </p>
          <Button
            variant="danger"
            size="sm"
            className="me-2"
            onClick={() => deleteRoom(room.id)}
            style={{ width: '80px' }}
          >
            Hapus
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleEditRoom(room.id)} 
            style={{ width: '80px' }}
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    ));
  };
  
  const handleEditRoom = (roomId) => {
    const roomToEdit = rooms.find((room) => room.id === roomId);
    setEditingRoomId(roomId);
    setNewRoom(roomToEdit.name);
    setNewRoomType(roomToEdit.type);
    setNewRoomPrice(roomToEdit.price);
    setNewRoomDescription(roomToEdit.description);
    setShowModal(true);
  };
  
  const addOrUpdateRoom = () => {
    if (!newRoom || !newRoomType || !newRoomPrice || !newRoomDescription) {
      setShowToast(true);
      return;
    }
    const updatedRooms = [...rooms];

    if (editingRoomId) {
      // Jika sedang mengedit, update data kamar
      const existingRoomIndex = updatedRooms.findIndex(
        (room) => room.id === editingRoomId
      );
  
      if (existingRoomIndex !== -1) {
        updatedRooms[existingRoomIndex] = {
          ...updatedRooms[existingRoomIndex],
          name: newRoom,
          type: newRoomType,
          price: newRoomPrice,
          description: newRoomDescription,
        };
      }
      setEditingRoomId(null); // Reset editingRoomId setelah pengeditan selesai
    } else {
      // Jika tidak, tambahkan kamar baru
      updatedRooms.push({
        id: Date.now(),
        name: newRoom,
        type: newRoomType,
        price: newRoomPrice,
        description: newRoomDescription,
      });
      setTotalRooms(totalRooms + 1);
    
    }
  
    setRooms(updatedRooms);
    setNewRoom("");
    setNewRoomType("");
    setNewRoomPrice("");
    setNewRoomDescription("");
    setShowModal(false);
  
    // Menampilkan toast success
    setShowSuccessToast(true);
  };

  const addRoom = () => {
    if (!newRoom || !newRoomType || !newRoomPrice || !newRoomDescription) {
      setShowToast(true);
      return;
    }

    setImageType(newRoomType);

    const newRooms = [
      ...rooms,
      {
        id: Date.now(),
        name: newRoom,
        type: newRoomType,
        price: newRoomPrice,
        description: newRoomDescription,
      },
    ];
    setRooms(newRooms);
    setTotalRooms(totalRooms + 1);
    setNewRoom("");
    setNewRoomType("");
    setNewRoomPrice("");
    setNewRoomDescription("");
    setShowModal(false);

    setShowToastSucess(true);
  };

  const deleteRoom = (roomId) => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms);
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
              <img
                src="https://via.placeholder.com/150"
                className="img-fluid-rounded"
                alt="Tidak Ada Gambar"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h1 className="mb-3 border-bottom fw-bold">Daftar Kamar</h1>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <p>
                Grand Atma saat ini memiliki {totalRooms} kamar yang eksotis
              </p>
              <Button variant="success" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" />
                Tambah Kamar
              </Button>
              <div className="mt-3">{renderRooms()}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        style={{ MaxWidth: "400px", margin: "auto" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoomName">
              <Form.Label>Nama Kamar</Form.Label>
              <Form.Control
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRoomType">
              <Form.Label>Tipe Kamar</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "465px",
                    textAlign: "left",
                  }}
                >
                  {newRoomType ? newRoomType : "Pilih Tipe Kamar"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setNewRoomType("Standard")}>
                    Standard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNewRoomType("Superior")}>
                    Superior
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setNewRoomType("Luxury")}>
                    Luxury
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group controlId="formRoomPrice">
              <Form.Label>Harga Kamar</Form.Label>
              <Form.Control
                type="text"
                value={newRoomPrice}
                onChange={(e) => setNewRoomPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRoomDescription">
              <Form.Label>Deskripsi Kamar</Form.Label>
              <Form.Control
                type="text"
                value={newRoomDescription}
                onChange={(e) => setNewRoomDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button variant="primary" onClick={addOrUpdateRoom}>
            <FaSave className="me-2" />
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        show={showToastSuccess}
        onClose={() => setShowToastSucess(false)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{editingRoomId ? 'Berhasil Edit' : 'Berhasil Tambah'} Data Kamar</Toast.Body>
      </Toast>
    </Container>
  );
};

export default DashboardPage;