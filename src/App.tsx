import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import { ApolloProvider } from "@apollo/client";
import client from "./api/client";
import Login from "./pages/Login";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import DetailCountry from "./pages/DetailCountry";
import { ChatProvider } from "./providers/ChatProvider";

function App() {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <ChatProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<RootLayout />}>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":countryId"
                                element={
                                    <ProtectedRoute>
                                        <DetailCountry />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
                </ChatProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
