import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import uploadToS3 from "../utils/awsS3uplod.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/apiResponse.js";

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullname } = req.body;

    // Check if all the required fields are provided
    if (!username || !email || !password || !fullname) {
        throw new ApiError("Please fill all the fields", 400);
    }

    // Check if the username or email already exists
    const userExisted = await User.findOne({ $or: [{ username }, { email }] });

    if (userExisted) {
        throw new ApiError("Username or email already existed", 400);
    }
    


    if(typeof(req.files.avatar) === "undefined"){
        throw new ApiError("Please upload an avatar", 400);
    }

   

    //console.log("image files :",req.files.avatar[0]);
    // Upload the avatar to S3 and retrieve the data
    const avatarS3data = await uploadToS3(
        req.files.avatar[0].path,
        req.files.avatar[0].originalname,
        true
    );

    
    if (avatarS3data == null) {
        throw new ApiError("avatar data is not retrieved from S3", 500);
    }

    let coverimageS3data = null;

    // Check if a cover image is uploaded
    if (typeof(req.files.coverimage) !== "undefined") {
        coverimageS3data = await uploadToS3(
            req.files.coverimage[0].path,
            req.files.coverimage[0].originalname,
            true,
        );
        if (coverimageS3data == null) {
            throw new ApiError("coverimage data is not retrieved from S3", 500);
        }
    }

    // Create a new user
    const user = await User.create({
        username,
        email,
        password,
        fullname,
        avatar: avatarS3data.Location,
        coverimage: coverimageS3data ? coverimageS3data.Location : null,
    });

    

    if (!user) {
        throw new ApiError("User is not created", 500);
    }

    // Find the created user and return the response
    const createdUser = await User.findOne({ _id: user._id })
        .select("-password -refreshtoken")
     
    
    return res.status(201).json(new ApiResponse(201, createdUser , "User is created"));
        
});


export { registerUser };
