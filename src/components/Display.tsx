import React, { Component } from 'react';

const Display = (props: any) => {
    return (
        <div>The weather in {props.location} is {props.weather} F&#176;</div>
    );
}

export default Display;