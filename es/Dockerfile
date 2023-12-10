FROM gcc
WORKDIR /app
COPY . .
RUN g++ main.cpp -std=c++17 -Wall -DONLINE_JUDGE -O2 -lm -fmax-errors=5 -march=native -s -o main
USER root
RUN chmod 755 /app/run.sh
CMD ./run.sh