from fastapi import FastAPI, UploadFile, File, HTTPException, status, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
from datetime import datetime
import shutil
import os
import uuid

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class BrowserInfo(BaseModel):
    operatingSystem: str | None = None
    operatingSystemVersion: str | None = None
    mobileModel: str | None = None
    browserName: str | None = None
    browserVersion: str | None = None

class OperationRequest(BaseModel):
    userName: str
    browserInfo: BrowserInfo | None = None

class OperationResponse(BaseModel):
    operationId: int
    operationGuid: str
    code: int
    message: str

@app.post("/onboarding/newOperation", response_model=OperationResponse)
async def new_operation(request: OperationRequest):
    response = {
        "operationId": 1234,
        "operationGuid": "mock-guid-1234-5678",
        "code": 901,
        "message": "Operation created successfully"
    }
    return response



# Define the request body model
class DocumentBody(BaseModel):
    operationId: int
    operationGuid: Optional[str] = None
    userName: str
    file: Optional[str] = None
    documentType: Optional[int] = None
    documentVersion: Optional[str] = None
    country: Optional[str] = None
    hasBarcode: Optional[bool] = None
    barcodeType: Optional[str] = None
    analyzeAnomalies: Optional[bool] = None
    analyzeOcr: Optional[bool] = None
    sideFace: Optional[bool] = None

# Define the response model
class AddSideResponse(BaseModel):
    containsBarcode: bool = False
    barcodeDetected: bool = False
    containsMrz: bool = False
    mrzDetected: bool = False
    addDocumentPictureRequired: bool = False
    documentPictureDetected: bool = False
    imageQuality: Optional[Dict[str, object]] = None

class AddFrontResponse(AddSideResponse):
    detectedCountry: Optional[str] = ""
    detectedCountryId: Optional[int] = None
    detectedDocumentCountryId: Optional[int] = None
    detectedDocumentCountry: Optional[str] = ""
    addBackRequired: Optional[bool] = False
    code: int
    message: str    

# Mocked POST method for /onboarding/addFront
@app.post("/onboarding/addFront", response_model=AddFrontResponse)
async def add_front_operation(document: DocumentBody):
    # Mock response (hardcoded values)

    # public final static int ADD_FRONT_OK = 909; //alta de frente exitoso
    # public final static int ADD_FRONT_FAIL = 9090;//alta de frente fallo
    # public final static int ADD_FRONT_ML_DOCUMENT_FACE_ANTISPOOFING_FAIL = 9091;
    # public final static int FRONT_ALREADY_EXIST = 911; //alta de frente fallo: ya existe imagen de frente
    # public final static int ADD_FRONT_DP_FAIL = 9092;//alta de frente fallo
    # public final static int ADD_FRONT_DP_PICTURE_EMPTY = 9095;//alta de frente fallo: no se retorno picture
    # public final static int ADD_FRONT_CITIZEN_PICTURE_REQUIRED = 9097;//alta de frente fallo: recorte ciudadano requerido
    # public final static int ADD_FRONT_DP_CONNECTION_FAIL = 9110;//alta de frente fallo: no se comunica con dp (404)
    # public final static int ML_DOCUMENT_FACE_ANTISPOOFING_NO_INFORMATION = 9112; //no obtenemos información de servicio de antispoofing por x motivo (404, 500, etc).    

        
    response = {
        "code": 909, 
        "message": "Add front successfully",        
        "containsBarcode": True,
        "barcodeDetected": False,
        "containsMrz": True,
        "mrzDetected": False,
        "addDocumentPictureRequired": False,
        "documentPictureDetected": True,
        "imageQuality": {
            "brightness": "good",
            "contrast": "acceptable"
        },
        "detectedCountry": "Argentina",
        "detectedCountryId": 1,
        "detectedDocumentCountryId": 101,
        "detectedDocumentCountry": "Argentina",
        "addBackRequired": True
    }
    return response


# Define the AddBackResponse model extending AddSideResponse
class AddBackResponse(AddSideResponse):
    code: int
    message: str


# Mocked POST method for /onboarding/addBack
@app.post("/onboarding/addBack", response_model=AddBackResponse)
async def add_back_operation(document: DocumentBody):
    # Mock response (hardcoded values)

    # public final static int ADD_BACK_OK = 912; //alta de dorso exitoso
    # public final static int ADD_BACK_FAIL = 9120;//alta de dorso fallo
    # public final static int BACK_ALREADY_EXIST = 914; //alta de dorso fallo: ya existe imagen de dorso para la operacion
    # public final static int ADD_BACK_DP_FAIL = 9093;//alta de dorso fallo
    # public final static int ADD_BACK_ML_DOCUMENT_FACE_ANTISPOOFING_FAIL = 9094;
    # public final static int ADD_BACK_DP_PICTURE_EMPTY = 9096;//alta de dorso fallo: no se retorno picture
    # public final static int ADD_BACK_CITIZEN_PICTURE_REQUIRED = 9098;//alta de dorso fallo: recorte ciudadano requerido
    # public final static int ADD_BACK_DP_CONNECTION_FAIL = 9111;//alta de dorso fallo: no se comunica con dp (404)

    response = {
        "code": 912, 
        "message": "Add front successfully",            
        "containsBarcode": True,
        "barcodeDetected": True,
        "containsMrz": False,
        "mrzDetected": True,
        "addDocumentPictureRequired": True,
        "documentPictureDetected": True,
        "imageQuality": {
            "brightness": "good",
            "contrast": "normal"
        }
    }
    return response


# Define the SelfieBody model
class SelfieBody(BaseModel):
    file: str
    imageType: str

# Define the OperationSelfiesBody request model
class OperationSelfiesBody(BaseModel):
    operationId: int
    operationGuid: Optional[str] = None
    userName: str
    selfieList: List[SelfieBody]
    analysisSelfieList: Optional[List[SelfieBody]] = None

# Define the RegisterResponse model
class RegisterResponse(BaseModel):
    code: int
    message: str

# Mocked POST method for /onboarding/register
@app.post("/onboarding/register", response_model=RegisterResponse)
async def register_operation(body: OperationSelfiesBody):
    # Mock response (hardcoded values)

    # public final static int ADD_SELFIES_OK = 932; //onboarding.register / face.register: selfies agregadas
    # public final static int ADD_SELFIES_FAIL = 933; //onboarding.register

    response = {
        "code": 932,
        "message": "Operation registered successfully"
    }
    return response


# Define the ApiKeyRest model (based on the BaseBody class)
class ApiKeyRest(BaseModel):
    businessId: int
    channelId: int

# Define the BaseBody model
class BaseBody(BaseModel):
    apiKey: Optional[ApiKeyRest] = None

    def get_business_id(self):
        return self.apiKey.businessId if self.apiKey else 0

    def get_channel_id(self):
        return self.apiKey.channelId if self.apiKey else 0

# Define the OperationBody model
class OperationBody(BaseBody):
    operationId: int
    operationGuid: Optional[str] = None
    userName: str

# Define the EndOperationBody model (request body)
class EndOperationBody(OperationBody):
    idRawResponse: Optional[bool] = None

# Define the EndOperationResponse model (response body)
class EndOperationResponse(BaseModel):
    code: int
    message: str
    identical: bool

# Mocked POST method for /onboarding/endOperation
@app.post("/onboarding/endOperation", response_model=EndOperationResponse)
async def end_operation(body: EndOperationBody):

    # public final static int END_OPERATION_OK = 903; //fin de operacion exitoso
    # public final static int END_OPERATION_FAIL = 904; //fin de operacion fallo: operacion debe estar en estado pendiente
    # public final static int END_OPERATION_EMPTY_FAIL = 905; //fin de operacion fallo: operacion debe tener imagen (frente o dorso) o informacion (ocr o barcode) documento no se permite terminar.
    # public final static int END_OPERATION_FRONT_BACK_NOT_BELONG = 1907; //fin de operacion fallo: no supera validacion info de frente - dorso segun pesos ocr, mrz, qrCode
    # public final static int END_OPERATION_FRONT_BACK_BELONG = 1908; //supera validacion info de frente - dorso segun pesos ocr, mrz, qrCode (interno)

    # public final static int END_OPERATION_BARCODE_EXISTS = 1909; //supera validacion info de frente - dorso segun pesos ocr, mrz, qrCode (interno)
    # public final static int END_OPERATION_BARCODE_NOT_EXISTS = 1910; //fin de operacion fallo: no supera validacion info de frente - dorso segun pesos ocr, mrz, qrCode

    # public final static int END_OPERATION_DOCUMENT_EXPIRATED = 1911; //fin de operacion fallo: no supera validacion de documento expirado segun tolerancia configurada
    # public final static int END_OPERATION_DOCUMENT_NOT_EXPIRATED = 1912; //supera validacion de documento expirado segun tolerancia configurada
    # public final static int END_OPERATION_DOCUMENT_EXPIRATED_NOT_IMPLEMENTED = 1913; //validacion de documento expirado no implementado

    # public final static int END_OPERATION_MANDATORY_ID_FIELD_MISSING = 1914;
    # public final static int END_OPERATION_MANDATORY_ID_FIELD_OK = 1915;

    # public final static int END_OPERATION_RESPONSE_FAIL = 1920; //fin de operacion fallo: error al realizar respuesta

    # public final static int END_OPERATION_FACE_DETECTION_DOCUMENT_FACE_NOT_FOUND = 1921; //fin de operacion fallo: face detection - document face not found
    # public final static int END_OPERATION_FACE_DETECTION_VALIDATION_FAIL = 1922; //fin de operacion fallo: face detection - validation failed
    # public final static int END_OPERATION_BIOMETRICS_COMPARE_FAIL = 1930; //fin de operacion fallo: biometryThreshold no superado
    # public final static int END_OPERATION_BIOMETRICS_EMPTY_FAIL = 1931; // fin de operacion fallo: Sin imagen para la comparacion

    # Mock response (hardcoded values)
    response = {
        "code": 903,
        "message": "Operation ended successfully",
        "identical": True  # Mocked identical value
    }
    return response


# Define the FaceSelfiesBody model (base for login and face data)
class FaceSelfiesBody(BaseBody):
    userName: str
    ipAddress: Optional[str] = None
    applicationVersion: Optional[str] = None
    operativeSystem: Optional[str] = None
    operativeSystemVersion: Optional[str] = None
    deviceManufacture: Optional[str] = None
    deviceName: Optional[str] = None
    selfieList: List[SelfieBody]
    analysisSelfieList: Optional[List[SelfieBody]] = None


class FaceLoginBody(FaceSelfiesBody):
    number: Optional[str] = None
    gender: Optional[str] = None
    countryCode: Optional[str] = None

# Define the FaceRecognitionResponse model (base response)
class FaceRecognitionResponse(BaseModel):
    code: int
    message: str
    confidence: Optional[float] = None
    identical: Optional[bool] = None
    faceLoginGuid: Optional[str] = None

# Define the FaceLoginResponse model (login response)
class FaceLoginResponse(FaceRecognitionResponse):
    pass


@app.post("/face/login", response_model=FaceLoginResponse)
async def face_login(body: FaceLoginBody):
    # Mock response (hardcoded values)

    # public final static int LOGIN_OK = 1002; //face.login
    # public final static int LOGIN_RISKY = 2042; //face.login
    # public final static int LOGIN_FAIL = 1003; //face.login
    # public final static int LOGIN_FAIL_FACE_USER_CREATED_ERROR = 1006; //face.login

    # public final static int USER_NOT_EXISTS = 1001; //user (Face or Onboarding) not exist in face.login
    # public final static int USER_ALREADY_EXISTS = 1004; //face.register
    # public final static int USER_DOESNT_HAVE_IMAGES = 1005; //face.login
    # public final static int USER_EXISTS_IDENTIFIED = 1011; //face.register

    # public final static int LOGIN_COUNTRY_INVALID = 1007; //face.login countryCode enviado invalido
    # public final static int LOGIN_COUNTRY_NOT_SUPPORTED = 1008; //face.login countryCode enviado no soportado
    # public final static int LOGIN_COUNTRY_UNAUTHORIZED = 1009; //face.login. countryCode enviado no vinculado con negocio de apikey
    # public final static int LOGIN_COUNTRY_REQUIRED = 1010; //face.login. countryCode requerido

    response = {
        "code": 1002,
        "message": "Login successful",
        "confidence": 0.95,  # Mock confidence value
        "identical": True,  # Mock identical value
        "faceLoginGuid": "face-login-guid-1234"
    }
    return response


# Define the FaceRegisterBody model (register request body)
class FaceRegisterBody(FaceSelfiesBody):
    showError: Optional[bool] = False

# Define the RegisterResponse model (response body)
class RegisterResponse(BaseModel):
    code: int
    message: str

# Mocked POST method for /face/register
@app.post("/face/register", response_model=RegisterResponse)
async def face_register(body: FaceRegisterBody):
    # Mock response (hardcoded values)

    # public final static int REGISTER_SUCCESS = 3001;//register face exitoso
    # public final static int REGISTER_FAIL = 3002;//register onboarding / face fail: no existe SN para operation //face.register: usuario deshabilitado (borrado)

    response = {
        "code": 3001,
        "message": "Registration successful"
    }
    
    return response

# Directory to save uploaded videos
VIDEO_UPLOAD_DIR = "uploaded_videos"
os.makedirs(VIDEO_UPLOAD_DIR, exist_ok=True)

class ResponseRequest(BaseModel):
    code: int
    message: str

@app.post("/onboarding/addVideos", response_model=ResponseRequest)
async def add_videos(
    operationId: int = Form(...),
    userName: str = Form(...),
    operationGuid: str = Form(...),
    VSS: UploadFile = File(...)
):
    # Validate video file type
    if VSS.content_type not in ["video/mp4", "video/avi", "video/mov"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid video format. Only mp4, avi, and mov are supported.",
        )

    try:

        file_extension = os.path.splitext(VSS.filename)[1]  # Get the original file extension
        unique_filename = f"{uuid.uuid4()}-{datetime.now().strftime('%Y%m%d%H%M%S')}{file_extension}"

        # Save the video file to disk
        file_path = os.path.join(VIDEO_UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(VSS.file, buffer)

        return ResponseRequest(code=2000, message="Video uploaded successfully")
    except Exception as e:
        # Handle any exceptions during file saving
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save video",
        )
    


# Define the CaptureGestureDetailBody model
class CaptureGestureDetailBody(BaseModel):
    # Assuming placeholder fields based on the context, as they were not provided.
    # Update these fields as per actual requirements.
    gestureType: str
    confidence: float

# Define the CaptureSelfieSaveBody model with date validation
class CaptureSelfieSaveBody(BaseModel):
    beginAt: datetime
    endAt: datetime
    minimumValidGestures: int = Field(ge=0)
    validGestures: int = Field(ge=0)
    invalidGestures: int = Field(ge=0)
    passedTest: bool
    detail: List[CaptureGestureDetailBody]

    # Validator to ensure beginAt is before endAt
    @validator("endAt")
    def check_date_order(cls, endAt, values):
        beginAt = values.get("beginAt")
        if beginAt and endAt <= beginAt:
            raise ValueError("The beginAt date must be lower than the endAt date")
        return endAt

@app.post("/selfie/saveLog", response_model=ResponseRequest)
async def save_log(body: CaptureSelfieSaveBody):
    # public final static int CAPTURE_SELFIE_LOG_SAVE_OK = 4000;
    # public final static int CAPTURE_SELFIE_LOG_SAVE_FAIL = 4001;
    return ResponseRequest(code=4000, message="Selfie log saved successfully")    



# Define the CaptureDocumentSaveBody model
class CaptureDocumentSaveBody(BaseModel):
    screenId: int = Field(..., description="Must be either 1 or 2")
    beginAt: datetime
    endAt: datetime

# Validate that screenId is either 1 or 2
@validator("screenId")
def validate_screen_id(cls, value):
    if value not in [1, 2]:
        raise ValueError("screenId must be either 1 or 2")
    return value

# Validate that beginAt is before endAt
@validator("endAt")
def validate_date_order(cls, endAt, values):
    beginAt = values.get("beginAt")
    if beginAt and endAt <= beginAt:
        raise ValueError("The beginAt date must be lower than the endAt date")
    return endAt

@app.post("/document/saveLog", response_model=ResponseRequest)
async def save_document_log(body: CaptureDocumentSaveBody):
    # public final static int CAPTURE_DOCUMENT_LOG_SAVE_OK = 3000;
    # public final static int CAPTURE_DOCUMENT_LOG_SAVE_FAIL = 3001;
    return ResponseRequest(code=3000, message="Document log saved successfully")


# Define the CaptureTransactionInitBody model
class CaptureTransactionInitBody(BaseModel):
    clientId: str = Field(..., min_length=1, description="Client ID, cannot be blank")
    platform: str = Field(..., min_length=1, description="Platform, cannot be blank")

@app.post("/transaction/init", response_model=ResponseRequest)
async def init_transaction(body: CaptureTransactionInitBody):
    # public final static int CAPTURE_TRANSACTION_INIT_OK = 2000;
    # public final static int CAPTURE_TRANSACTION_INIT_FAIL = 2001;
    return ResponseRequest(code=2000, message="Transaction initialized successfully")    



class Document(BaseModel):
    number: str = Field(..., max_length=12, description="Document number")
    gender: Optional[str] = Field(None, max_length=15, description="Gender")
    names: Optional[str] = Field(None, max_length=200, description="First names")
    lastNames: Optional[str] = Field(None, max_length=200, description="Last names")
    birthdate: Optional[str] = Field(None, max_length=50, description="Birthdate")

# Define the DataBody model
class DataBody(BaseModel):
    operationId: int = Field(..., ge=1, description="Operation ID must be at least 1")
    operationGuid: Optional[str] = Field(None, description="Operation GUID")
    userName: str = Field(..., max_length=200, description="Username")
    document: Optional[Document] = None
    data: Optional[Dict[str, Any]] = None

    # Validator to ensure userName is not blank
    @validator("userName")
    def validate_user_name(cls, value):
        if not value.strip():
            raise ValueError("Username cannot be blank")
        return value
    

@app.post("/onboarding/addBarcode", response_model=ResponseRequest)
async def add_barcode(body: DataBody):
    print(body)
    # public static final int ADD_BARCODE_OK = 920;//alta de barcode exitoso
    # public static final int ADD_BARCODE_FAIL = 921;//alta de barcode fallo: elemento document y data del mensaje vacios
    return ResponseRequest(code=920, message="Barcode data added successfully")      