import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/notes', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

mongoose.connection.once('open', () => {
    console.log('Connection established');
}).on('error', error => {
    console.log('Connection error:', error);
});

export default mongoose;