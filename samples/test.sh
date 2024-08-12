# pipe ls into readlines. echo only files, but with removed extensions
pipe_ls_into_readlines() {
    ls | while IFS= read -r line; do
        filename="${line%.*}"
        echo "${filename}"
    done
}

# send post request with {"message": filename} to dummy.endpoint/blubb where filename is the above filename without extension

send_post_request() {
    pipe_ls_into_readlines | while IFS= read -r filename; do
        curl -X POST \
          http://dummy.endpoint/blubb \
          -H 'Content-Type: application/json' \
          -d '{"message": "'${filename}'"}'
    done
}


check_if_input_path_exists_and_is_a_directory(){
  if [ -d "$1" ]; then
      echo "The input path exists and is a directory."
  else
      echo "The input path does not exist or is not a directory."
  fi
}
