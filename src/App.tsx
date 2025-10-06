import { createTheme, ThemeProvider } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import AppRouter from "./provider/router/AppRouter";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: orange[500],
            },
            background: {
                default: grey[900],
                paper: grey[800],
            },
        },
        status: {
            danger: orange[700],
        },
    });

    return (
        <div className="app">
            <ThemeProvider theme={darkTheme}>
                <AppRouter />
            </ThemeProvider>
        </div>
    )
}

export default App

