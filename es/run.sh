dir="./inputs"
a="inputs"
b="outputs"
time_exec_prefix="time_"
for input_file in $dir/*;
do
    output_file=$(echo "$input_file" | sed "s/$a/$b/")
    time_exec_file = $time_exec_prefix$output_file
    touch $output_file
    touch $time_exec_file
    timeout 2 ./main < $input_file > $output_file || echo "Timeout" > $output_file  
    time (timeout 2 ./main < $input_file > $output_file) > $time_exec_file  
done