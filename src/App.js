import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from './components/Navbar';
import ShowHealth from './components/ShowHealth';
import CreateHealth from './components/CreateHealth';
import EditHealth from './components/EditHealth';

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <br />

                <Route path="/" exact component={ShowHealth}></Route>
                <Route path="/create" component={CreateHealth}></Route>
                <Route path="/edit/:id" component={EditHealth}></Route>

            </Router>
        </div>
    );
}

export default App;
