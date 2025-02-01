import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import { ApolloProvider } from "@apollo/client";
import client from "./api/client";
import Login from "./pages/Login";
import { AuthProvider } from "./Providers/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<RootLayout />}>
                            <Route index element={
                              <ProtectedRoute>
                              <Home />
                          </ProtectedRoute>
                              } />
                        </Route>
                        <Route path="login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
