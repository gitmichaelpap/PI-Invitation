import React, { Component } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import {withStyles } from '@material-ui/core';
import UploadService from "../../services/UploadService";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      image: "",
      customImage: "../../modelo.jpg",
    };

  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
      image: event.target.files[0],
    });
  }

  clear() {
    this.setState({
      progress: 0,
    });
  }

  upload() {

    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          progress: 100,
          message: "Upload the file success!",
          isError: false,
        });
        return;
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
          isError: true
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      isError,
      image, 
      customImage
    } = this.state;
    
    return (
      <div>
        {currentFile && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }

        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={this.selectFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span"
            onClick={this.clear} >
             Choose File
          </Button>
        </label>

        <div className="file-name">
        {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
        </div>

        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFiles}
          onClick={this.upload}
          endIcon={<SendIcon/>}>
          SEND
        </Button>

        <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
          {message}
        </Typography>

        <Typography variant="h6" className="list-header">
          Preview:
        </Typography>

        <div className="preview-invite">
          <Card sx={{ maxWidth: 1000 }}>
            <CardActionArea>
                <CardMedia
                  component="img"
                  height="800"
                  image={ image ? URL.createObjectURL(image) : customImage}
                  alt="Invitation"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Invitation
                  </Typography>
                </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    );
  }
}