def to_json(data):
    if isinstance(data, list):
        all_users = []
        for user in data:
            for i in user.address.all():
                test_user = {
                    'id': user.id,
                    'name': user.name,
                    # 'password': user.password,
                    # 'password_reset_token': user.password_reset_token,
                    'phone': user.phone,
                    'email': user.email,
                    'user_group': user.user_group,
                    'user_type': user.user_type,
                    'creation_time': user.creation_time,
                    'created_by': user.created_by,
                    'confirmed_on': user.confirmed_on,
                    'confirmed': user.confirmed,
                    'modification_time': user.modification_time,
                    'modified_by': user.modified_by,
                    'address': {
                        'id': i.id,
                        'addressline1': i.addressline1,
                        'addressline2': i.addressline2,
                        'city': i.city,
                        'pincode': i.pincode,
                        'creation_time': i.creation_time,
                        'modification_time': i.modification_time,
                        'created_by': i.created_by,
                        'modified_by': i.modified_by
                    }
                }
                all_users.append(test_user)
        return all_users
    else:
        test_user = None
        for i in data.address:
            test_user = {
                'id': data.id,
                'name': data.name,
                # 'password': data.password,
                # 'password_reset_token': data.password_reset_token,
                'phone': data.phone,
                'email': data.email,
                'user_group': data.user_group,
                'user_type': data.user_type,
                'creation_time': data.creation_time,
                'created_by': data.created_by,
                'confirmed_on': data.confirmed_on,
                'confirmed': data.confirmed,
                'modification_time': data.modification_time,
                'modified_by': data.modified_by,
                'address': {
                    'id': i.id,
                    'addressline1': i.addressline1,
                    'addressline2': i.addressline2,
                    'city': i.city,
                    'pincode': i.pincode,
                    'creation_time': i.creation_time,
                    'modification_time': i.modification_time,
                    'created_by': i.created_by,
                    'modified_by': i.modified_by
                }
            }
        return test_user