import React from 'react';

const TopList = ({ tops }) => (
    <div className="container">
        <div className="album py-5">
        <div className="row">
            { Object.values(tops).map(tops => <Top top={ tops } />) }
        </div>
        </div>
    </div>
);

const Top = ({ top }) => (
    <div className="col-md-4">
    <div class="card mb-4 box-shadow">
        <img class="card-img-top" src={ top.image } alt={ top.name }/>
            <div class="card-body">
                <p class="card-text">{ top.name } by { top.brand }</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">{ top.type }</small>
                    </div>
                </div>
            </div>
    </div>
);

export default TopList;