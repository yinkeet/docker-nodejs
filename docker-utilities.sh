#!/bin/bash

BUILD_RUN_PROD="build-run-prod"
RUN_DEV="run-dev"
RUN_PROD="run-prod"
CLEANUP="cleanup"
RM_STOPPED="rm-stopped"
RMI_ALL="rmi-all"
RMI_UNTAGGED="rmi-untagged"
RM_UNUSED_VOLUME="rm-unused-volumes"

if [ "$#" -eq 0 ] || [ $1 = "--help" ]; then
    echo "Usage: ./docker-utilities [OPTIONS] COMMAND [arg...]"
    echo "       ./docker-utilities [ -h | --help ]"
    echo ""
    echo "Options:"
    echo "  -h, --help    Prints usage."
    echo ""
    echo "Commands:"
    echo "  $BUILD_RUN_PROD     Build then run in production mode."
    echo "  $RUN_DEV            Run in development mode."
    echo "  $RUN_PROD           Run in production mode."
    echo "  $CLEANUP            Removes stopped containers, followed by untagged images and then unused volumes."
    echo "  $RM_STOPPED         Removes all stopped containers."
    echo "  $RMI_ALL            Removes all images."
    echo "  $RMI_UNTAGGED       Removes all untagged images."
    echo "  $RM_UNUSED_VOLUME  Removes all unused volumes."
    exit
fi

build_production() {
  echo "Building for production mode."
  docker-compose -f docker-compose.yml -f docker-compose.build.yml build
  docker-compose -f docker-compose.yml -f docker-compose.build.yml up -d
}

run_development() {
  echo "Running in development mode."
  docker-compose build
  docker-compose up -d
}

run_production() {
  echo "Running in production mode."
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
}

cleanup() {
  echo "Cleaning up docker."
  remove_stopped_containers
  remove_untagged_images
  remove_unused_volumes
}

remove_stopped_containers() {
  CONTAINERS="$(docker ps -a -f status=exited -q)"
  if [ ${#CONTAINERS} -gt 0 ]; then
    echo "Removing all stopped containers."
    docker rm $CONTAINERS
  else
    echo "All stopped containers has already been removed."
  fi
}

remove_all_images() {
  CONTAINERS="$(docker images -q)"
  if [ ${#CONTAINERS} -gt 0 ]; then
    echo "Removing all untagged images."
    docker rmi $CONTAINERS
  else
    echo "All untagged images has already been removed."
  fi
}

remove_untagged_images() {
  CONTAINERS="$(docker images -f "dangling=true" -q)"
  if [ ${#CONTAINERS} -gt 0 ]; then
    echo "Removing all untagged images."
    docker rmi $CONTAINERS
  else
    echo "All untagged images has already been removed."
  fi
}

remove_unused_volumes() {
  CONTAINERS="$(docker volume ls -qf dangling=true)"
  if [ ${#CONTAINERS} -gt 0 ]; then
    echo "Removing all unused volumes."
    docker volume rm $CONTAINERS
  else
    echo "All unused volumes has already been removed."
  fi
}

if [ $1 = $CLEANUP ]; then
  cleanup
  exit
fi

if [ $1 = $BUILD_RUN_PROD ]; then
  build_production
  run_production
  cleanup
  exit
fi

if [ $1 = $RUN_DEV ]; then
  run_development
  exit
fi

if [ $1 = $RUN_PROD ]; then
  run_production
  exit
fi

if [ $1 = $RM_STOPPED ]; then
  remove_stopped_containers
  exit
fi

if [ $1 = $RMI_ALL ]; then
  remove_all_images
  exit
fi

if [ $1 = $RMI_UNTAGGED ]; then
  remove_untagged_images
  exit
fi

if [ $1 = $RM_UNUSED_VOLUME ]; then
  remove_unused_volumes
  exit
fi