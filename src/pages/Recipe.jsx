import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const data = await api.json();
        setDetails(data);
        console.log(data);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <ImageWrapper>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
            </ImageWrapper>

            <Info>
                <Button 
                    className={activeTab === 'instructions' ? 'active' : ''} 
                    onClick={() => setActiveTab('instructions')}
                >
                    Instructions
                </Button>
                <Button 
                    className={activeTab === 'ingredients' ? 'active' : ''} 
                    onClick={() => setActiveTab('ingredients')}
                >
                    Ingredients
                </Button>

                {activeTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                    </div>
                )}

                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
    margin: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (min-width: 1000px) {
        flex-direction: row;
        text-align: left;
    }

    h2 {
        margin-bottom: 2rem;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 1rem;
    }

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul {
        margin-top: 2rem;
    }
`;

const ImageWrapper = styled.div`
    flex: 1;
    min-width: 300px;

    img {
        width: 100%;
        height: auto;
        max-width: 500px;
    }

    h2 {
        margin-bottom: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    transition: background 0.3s ease;

    &:hover {
        background: #f8f8f8;
    }

    &.active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
`;

const Info = styled.div`
    flex: 2;
    margin-top: 2rem;

    @media (min-width: 1000px) {
        margin-top: 0;
        margin-left: 3rem;
    }
`;

export default Recipe;