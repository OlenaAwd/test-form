import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import useDebounce from "../../hooks/useDebounce";
import InputUserData from "../InputUserData";
import styles from "./UserDetails.module.scss";
import { FormControl, Typography } from "@mui/material";
import Button from "../Button";
import axios from "axios";

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [valueRadio, setValueRadio] = useState("person");
  const [pesel, setPesel] = useState("");
  const [peselError, setPeselError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isEditPesel, setEditPesel] = useState(true);
  const [nip, setNip] = useState("");
  const [nipError, setNipError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isEditNip, setEditNip] = useState(true);
  const [selectedImg, setSelectedImg] = useState([]);
  const [finalImg, setFinalImg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeFirstName = (val) => {
    const value = val.target.value || "";
    const valueEdited = value.replace(/[0-9]/g, "");
    setFirstNameError("");
    setFirstName(valueEdited);

    if (!valueEdited) {
      setFirstNameError("Please, enter your first name");
      return;
    }
  };

  const handleChangeLastName = (val) => {
    const value = val.target.value || "";
    const valueEdited = value.replace(/[0-9]/g, "");
    setLastNameError("");
    setLastName(valueEdited);

    if (!valueEdited) {
      setLastNameError("Please, enter your last name");
      return;
    }
  };

  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
  };

  const handleChangePesel = (val) => {
    const value = val.target.value || "";
    setPeselError("");
    setPesel(value);

    if (!value) {
      setPeselError("Please, enter a valid PESEL");
      return;
    }
  };

  const debouncedPesel = useDebounce(pesel, 500);

  useEffect(() => {
    if (debouncedPesel) {
      validatePesel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPesel]);

  const validatePesel = () => {
    setEditPesel(true);
    const regex = /^\d{11}/;
    const checkPesel = regex.test(pesel);
    //     AppStore.updateMobile_phone("");
    if (pesel.length === 0 || pesel.length > 11) {
      setPeselError("Please enter a valid pesel number");
      return;
    }
    if (!checkPesel) {
      setPeselError("Please enter a valid pesel number");
      return;
    }
    setPeselError("");
  };

  const handleChangeNip = (val) => {
    const value = val.target.value || "";
    // const valueEdited = value.replace(/[0-9]/g, "");
    setNipError("");
    setNip(value);

    if (!value) {
      setNipError("Please, enter your company's NIP");
      return;
    }
  };

  const debouncedNip = useDebounce(nip, 500);

  useEffect(() => {
    if (debouncedNip) {
      validateNip();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNip]);

  const validateNip = () => {
    setEditNip(true);
    const regex = /^\d{10}/;
    const checkNip = regex.test(nip);
    if (nip.length === 0 || nip.length > 10) {
      setNipError("Please enter a valid NIP number");
      return;
    }
    if (!checkNip) {
      setNipError("Please enter a valid NIP number");
      return;
    }
    setNipError("");
  };

  const handleSubmit = (e) => {
    sendUserData();
  };

  const sendUserData = async () => {
    let payload = { firstName, lastName, valueRadio, pesel, nip, finalImg };
    await axios
      .post("https://localhost:60001/Contractor/Save", payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setErrorMessage("Nie znaleziono metody zapisu");
      });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    const selectedFilesArr = Array.from(selectedFiles);
    const imgArr = selectedFilesArr.map((file) => {
      return URL.createObjectURL(file);
    });
    let finalImg = imgArr.toString();
    setSelectedImg(imgArr);
    setFinalImg(finalImg);
  };

  const isDisabled =
    !firstName ||
    !lastName ||
    (valueRadio === "person" && !pesel) ||
    (valueRadio === "person" && !!peselError) ||
    (valueRadio === "company" && !nip) ||
    (valueRadio === "company" && !!nipError) ||
    !finalImg;

  return (
    <>
      <div className={styles.container}>
        <Typography
          sx={{ fontSize: "28px", marginBottom: "25px" }}
          variant="h3"
        >
          User Form
        </Typography>
        <InputUserData
          placeholder="First Name"
          initialValue={firstName}
          error={firstNameError ? true : false}
          helperText={firstNameError}
          onChange={handleChangeFirstName}
        />
        <InputUserData
          placeholder="Last Name"
          initialValue={lastName}
          error={lastNameError ? true : false}
          helperText={lastNameError}
          onChange={handleChangeLastName}
        />
        <FormControl sx={{ display: "flex" }}>
          <FormLabel
            sx={{ marginBottom: "10px", display: "flex", paddingLeft: "52px" }}
          >
            Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={valueRadio}
            onChange={handleChangeRadio}
            sx={{ paddingLeft: "52px", marginBottom: "15px" }}
          >
            <FormControlLabel
              value="person"
              control={<Radio />}
              label="Person"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Company"
            />
          </RadioGroup>
        </FormControl>
        {valueRadio === "person" ? (
          <>
            <InputUserData
              placeholder="PESEL"
              initialValue={pesel}
              error={peselError ? true : false}
              helperText={peselError}
              onChange={handleChangePesel}
            />
          </>
        ) : (
          <>
            <InputUserData
              placeholder="NIP"
              initialValue={nip}
              error={nipError ? true : false}
              helperText={nipError}
              onChange={handleChangeNip}
            />
          </>
        )}

        <Typography
          sx={{ fontSize: "20px", marginBottom: "15px" }}
          variant="h3"
        >
          Add your photo
        </Typography>
        <Typography
          sx={{ fontSize: "20px", marginBottom: "15px" }}
          variant="h3"
        >
          Support formats: JPG, JPEG
        </Typography>

        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          accept="image/jpg, image/jpeg"
          className={styles.fileInput}
        />
        {selectedImg &&
          selectedImg.map((img, index) => {
            return (
              <div key={img}>
                <img src={img} alt="user" className={styles.img} />{" "}
              </div>
            );
          })}
        {errorMessage && (
          <span className={styles.errMessage}>No save method found</span>
        )}

        <Button onClick={handleSubmit} disabled={isDisabled}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default UserDetails;
