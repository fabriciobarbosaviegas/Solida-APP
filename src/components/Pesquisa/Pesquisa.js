import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {
    state = {
        places: [],
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false
    };

    componentDidMount() {
        this.autocomplete = new this.props.google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            {}
        );

        this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    }

    onMapReady(mapProps, map) {
        this.map = map;
    }

    onPlaceChanged = () => {
        const place = this.autocomplete.getPlace();
        const bounds = new this.props.google.maps.LatLngBounds();

        if (!place.geometry) {
            console.log('Local não encontrado');
            return;
        }

        if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }

        this.setState({ places: [place] });
        this.map.fitBounds(bounds);
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <div>
                <input
                    id="autocomplete"
                    type="text"
                    placeholder="Digite o local que deseja pesquisar"
                    style={{
                        margin: '10px',
                        padding: '10px',
                        width: '300px'
                    }}
                />
                <Map
                    google={this.props.google}
                    onReady={this.onMapReady.bind(this)}
                    zoom={14}
                    style={{ width: '100%', height: '400px', position: 'relative' }}
                    initialCenter={{
                        lat: -34.397,
                        lng: 150.644
                    }}
                >
                    {this.state.places.map(place => (
                        <Marker
                            key={place.id}
                            title={place.name}
                            name={place.name}
                            position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
                            onClick={this.onMarkerClick}
                        />
                    ))}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC4fFygwHCpycqrLYATM-DiW9EcVWDdRx0' // Substitua pela sua chave de API
})(MapContainer);
