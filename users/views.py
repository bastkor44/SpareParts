from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer,UserProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from .models import CustomUser
from rest_framework import permissions


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

User = get_user_model()

@api_view(['POST'])
def LoginView(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        role = user.role

        # Panel URLs or role flag
        panel_url = ""
        if role == 'admin':
            panel_url = "/admin/dashboard"
        elif role == 'manager':
            panel_url = "/manager/dashboard"
        else:
            panel_url = "/user/home"

        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "redirect_url": panel_url
        })
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def view_profile(request, pk):
    requester = request.user
    try:
        user_to_view = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if requester.id != user_to_view.id:
        return Response({"error": "Permission denied"}, status=403)

    serializer = UserProfileSerializer(user_to_view)
    return Response(serializer.data)

    
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_profile(request, pk):
    requester = request.user
    try:
        user_to_update = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    if requester.id != user_to_update.id :
        return Response({"error": "Permission denied"}, status=403)

    serializer = UserProfileSerializer(user_to_update, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_profile(request, pk):
    requester = request.user
    try:
        user_to_delete = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if requester.id != user_to_delete.id:
        return Response({"error": "Permission denied"}, status=403)

    user_to_delete.delete()
    return Response({"detail": "User account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class UserProfileView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny] 