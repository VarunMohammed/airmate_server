const mongoose = require('mongoose');
const uri = 'mongodb+srv://airmatedev:airmate.dev@airmate.dplynfb.mongodb.net/test?retryWrites=true&w=majority&appName=airmate';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const defineSchemasAndModels = () => {
  const userloginSchema = new mongoose.Schema({
    UserID: { type: Number, required: true, unique: true },
    Username: { type: String, required: true },
    PasswordHash: { type: String, required: true },
    LastLoginTimestamp: { type: Date, default: Date.now }
  });
  const MyModel = mongoose.model('userlogin', userloginSchema);

  const userDetailsSchema = new mongoose.Schema({
    UserID: { type: Number, required: true, unique: true },
    FirstName: { type: String, required: true },
    MiddleName:{ type : String},
    LastName: { type: String, required: true },
    Gender: { type: String},
    Email: { type: String },
    Phone: { type: String },
    AadhaarNumber: { type: String },
    PassportNumber: { type: String },
    hasPassport:{type: Boolean, required:true},
    passportCountry:{type:String},
    passportexpirydate:{ type: String },
    address: {type: String},
    password:{type:String,required:true,length:8},
  });
  const MyModel2 = mongoose.model("userdetails", userDetailsSchema);

  const flightDetailsSchema = new mongoose.Schema({
    FlightID: { type: Number, required: true, unique: true },
    UserID: { type: Number, required: true },
    FlightNumber: { type: String, required: true },
    DepartureAirport: { type: String, required: true },
    ArrivalAirport: { type: String, required: true },
    DepartureDateTime: { type: Date, required: true },
    ArrivalDateTime: { type: Date, required: true },
  });
  const MyModel3 = mongoose.model("flightdetails", flightDetailsSchema);

  const baggageTrackingSchema = new mongoose.Schema({
    TrackingID: { type: Number, required: true, unique: true },
    UserID: { type: Number, required: true },
    FlightID: { type: Number, required: true },
    BaggageTagNumber: { type: String, required: true },
    DepartureScanningPoint: { type: String },
    ArrivalScanningPoint: { type: String },
    CurrentLocation: { type: String, required: true },
    Timestamp: { type: Date, required: true },
  });
  const MyModel4 = mongoose.model('Baggagedetails', baggageTrackingSchema);

  const gateSchema = new mongoose.Schema({
    GateAssignmentID: { type: Number, required: true, unique: true },
    FlightID: { type: Number, required: true }, 
    GateNumber: { type: String, required: true },
  });
  const MyModel5 = mongoose.model('gate', gateSchema);
  
  const ClassSchema = new mongoose.Schema({
    CabinClassID: { type: Number, required: true, unique: true },
    ClassName: { type: String, required: true }, 
  });
  const MyModel6 = mongoose.model('cabinClasses', ClassSchema);

  const passengerBookingsSchema = new mongoose.Schema({
    BookingID: { type: Number, required: true, unique: true },
    FlightID: { type: Number, required: true }, 
    UserID: { type: Number, required: true }, 
    CabinClassID: { type: Number, required: true },
    SeatNumber: { type: String, required: true },
  });
  const MyModel7 = mongoose.model('passengerBookings', passengerBookingsSchema);
  
  const baggageSchema = new mongoose.Schema({
    BaggageID:{type:Number, required: true, unique: true},
    BaggageType:{type:String , required: true},
    BaggageWeight:{type:Number , required:true},
  });
  const Mymodel8 = mongoose.model('baggagetrack' , baggageSchema);
  
  console.log('Collections created with schemas');

  return {
    MyModel,
    MyModel2,
    MyModel3,
    MyModel4,
    MyModel5,
    MyModel6,
    MyModel7,
    Mymodel8
  };
};
module.exports = {
  connectDB,
  defineSchemasAndModels
};
