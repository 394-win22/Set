import React from 'react';

const ItemList = ({ items }) => (
    <div className="container">
        <div className="album py-5">
        <div className="row">
            { Object.values(items).map(items => <Item item={ items } />) }
        </div>
        </div>
    </div>
);

const Item = ({ item }) => (
    <div className="col-md-4">
    <div class="card mb-4 box-shadow">
        <img class="card-img-top" src={ item.image } alt={ item.name }/>
            <div class="card-body">
                <p class="card-text">{ item.name } by { item.brand }</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">{ item.type }</small>
                    </div>
                </div>
            </div>
    </div>
);

export default ItemList;