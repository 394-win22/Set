import React from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import { NewItemForm } from '../components/NewItemForm'

const NewItemPage = () => {
  return (
    <div>
      <Container>
        <NewItemForm/>
      </Container>
    </div>
  );
};

export default NewItemPage;
