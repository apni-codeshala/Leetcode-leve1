# Use a base image with a C compiler (e.g., gcc)
FROM gcc:latest

# Set the working directory inside the container
WORKDIR /usr/src/myapp

# Copy the C source code into the container
COPY . .

# Compile the C code and create an executable
RUN gcc -o myapp main.c

# Define the command to run when the container starts
CMD ["./myapp"]
