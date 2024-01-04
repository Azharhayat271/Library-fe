import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weclome from "./components/login/login";
import Signup from "./components/login/signup";
import Layout from "./components/home/index";
import Dashboard from "./components/home/dashboard";
import RootLayout from "./components/home/layout";
import Protectedroutes from "./components/routes/protectedroutes";
import Users from "./components/profiles/index";
import Student from "./components/student/index";
import AddStudent from "./components/student/addstudent";
import Books from "./components/books/index";
import AddBooks from "./components/books/addbook";
import Issuebook from "./components/issue_book/index";
import Setting from "./components/setting/index";
import EditStudentForm from "./components/student/editstudent";
import EditBookForm from "./components/books/editbooks";
import Managefine from "./components/setting/managefine";
import Issuebookrecords from "./components/issue_book/issuebooktable";
import ReturnBokk from "./components/returnbook/index";
import ReturnBook from "./components/returnbook/return";
import FineManagement from "./components/returnbook/finetable";
import ReturnInventory from "./components/inventory/index";
import EditIssue from "./components/issue_book/edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weclome />} />

        <Route
          path="/home"
          element={
            <RootLayout>
              <Layout />
            </RootLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <RootLayout>
              <Signup />
            </RootLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RootLayout>
              <Protectedroutes Component={Dashboard} />
            </RootLayout>
          }
        />
        <Route
          path="/users"
          element={
            <RootLayout>
              <Protectedroutes Component={Users} />
            </RootLayout>
          }
        />
        <Route
          path="/students"
          element={
            <RootLayout>
              <Protectedroutes Component={Student} />
            </RootLayout>
          }
        />
        <Route
          path="/students/add"
          element={
            <RootLayout>
              <Protectedroutes Component={AddStudent} />
            </RootLayout>
          }
        />
        <Route
          path="/books"
          element={
            <RootLayout>
              <Protectedroutes Component={Books} />
            </RootLayout>
          }
        />
        <Route
          path="/books/add"
          element={
            <RootLayout>
              <Protectedroutes Component={AddBooks} />
            </RootLayout>
          }
        />
        <Route
          path="/issue"
          element={
            <RootLayout>
              <Protectedroutes Component={Issuebook} />
            </RootLayout>
          }
        />
        <Route
          path="/setting"
          element={
            <RootLayout>
              <Protectedroutes Component={Setting} />
            </RootLayout>
          }
        />
        <Route
          path="/students/edit/:id"
          element={
            <RootLayout>
              <Protectedroutes Component={EditStudentForm} />
            </RootLayout>
          }
        />
        <Route
          path="/books/edit/:id"
          element={
            <RootLayout>
              <Protectedroutes Component={EditBookForm} />
            </RootLayout>
          }
        />
        <Route
          path="/managefine"
          element={
            <RootLayout>
              <Protectedroutes Component={Managefine} />
            </RootLayout>
          }
        />
        <Route
          path="/issuebookrecords"
          element={
            <RootLayout>
              <Protectedroutes Component={Issuebookrecords} />
            </RootLayout>
          }
        />
        <Route
          path="/returnbook"
          element={
            <RootLayout>
              <Protectedroutes Component={ReturnBokk} />
            </RootLayout>
          }
        />
        <Route
          path="/bookissues/return/:regNo"
          element={
            <RootLayout>
              <Protectedroutes Component={ReturnBook} />
            </RootLayout>
          }
        />
        <Route
          path="/finemanagement"
          element={
            <RootLayout>
              <Protectedroutes Component={FineManagement} />
            </RootLayout>
          }
        />
        <Route
          path="/returninventory"
          element={
            <RootLayout>
              <Protectedroutes Component={ReturnInventory} />
            </RootLayout>
          }
        />
        <Route
          path="/issuebookrecords/edit/:regNo"
          element={
            <RootLayout>
              <Protectedroutes Component={EditIssue} />
            </RootLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
