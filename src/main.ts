import Simulation from './Simulation';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const simulation = new Simulation(ctx, 7);

simulation.start();