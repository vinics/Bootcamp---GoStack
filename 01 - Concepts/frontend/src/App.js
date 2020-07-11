import React, { useState, useEffect } from 'react';

import api from './services/api';

// Stylesheets
import './App.css';

import Header from './components/Header';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then( response => {
            setProjects(response.data);
        } );
    }, []);

    async function handleAddProject(e) {
        // setProjects([...projects, document.getElementById('newProject').value]);
        e.preventDefault();

        const form = document.querySelector('form').elements;

        const response = await api.post('projects', {
            title: form["title"].value,
            owner: form["owner"].value,
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <Header title="Projects">
            <form>
                <input type="text" name="title" placeholder="Project title"/>
                <input type="text" name="owner" placeholder="Project owner"/>
                <input type="submit" value="Add" onClick={handleAddProject}/>
            </form>
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
        </Header>
    );
}

export default App;